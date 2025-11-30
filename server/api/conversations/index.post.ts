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
      throw createError({
        statusCode: 400,
        statusMessage: 'Participants invalid',
        data: {
          errors: [
            {
              field: 'participantUsernames',
              message: 'Some participants do not exist.',
              invalidUsernames: missingUsernames,
            },
          ],
        },
      })
    }

    const usersFingerprint = existingIds.sort((a, b) => a - b).join('_')

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
    errorHandler(error)
  }
})
