export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.participantUsernames.includes(event.context.user.username))
    body.participantUsernames.push(event.context.user.username)

  const data = validateSchema(conversationCreateSchema, body)

  data.isGroup = data.participantUsernames.length > 2

  try {
    const existingUsers = await db.query.users.findMany({
      columns: { id: true, username: true },
      where: inArray(users.username, data.participantUsernames),
    })

    const existingIds = existingUsers.map((u) => u.id)
    const existingUsernames = existingUsers.map((u) => u.username)

    const missingUsernames = data.participantUsernames.filter(
      (username) => !existingUsernames.includes(username),
    )
    if (missingUsernames.length > 0) {
      throw new InputValidationError([
        ...missingUsernames.map((username) => ({
          field: `participantUsernames.${data.participantUsernames.indexOf(username)}`,
          message: `User '${username}' does not exist`,
          rule: 'exists',
        })),
        {
          field: 'participantUsernames',
          message: "Some users don't exist",
          rule: 'exists',
        },
      ])
    }

    const usersFingerprint = existingIds.sort((a, b) => a - b).join('_')

    const existingConversation = await db.query.conversations.findFirst({
      where: eq(conversations.usersFingerprint, usersFingerprint),
      columns: { id: true },
    })

    if (existingConversation) {
      throw new ResourceConflictError('Conversation already exists', {
        meta: {
          existingConversationId: existingConversation.id,
        },
      })
    }

    const conversation = await db.transaction(async (tx) => {
      const [conversation] = await tx
        .insert(conversations)
        .values({
          ...data,
          usersFingerprint,
        })
        .returning()

      await tx.insert(usersToConversations).values(
        existingIds.map((userId) => ({
          userId,
          conversationId: conversation.id,
        })),
      )

      return conversation
    })

    return conversation
  } catch (error) {
    handleError(error)
  }
})
