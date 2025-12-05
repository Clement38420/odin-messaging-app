export default defineEventHandler(async (event) => {
  const conversationId = Number(getRouterParam(event, 'id'))
  await requireConversationAccess(event, conversationId)

  try {
    const conversation = await db.query.conversations.findFirst({
      where: eq(conversations.id, conversationId),
      columns: {
        name: true,
        isGroup: true,
      },
      with: {
        usersToConversations: {
          with: {
            user: {
              columns: Object.fromEntries(
                Object.keys(userSenderSchema.shape).map((field) => [
                  field,
                  true,
                ]),
              ),
            },
          },
        },
      },
    })

    if (!conversation)
      throw createError({
        statusCode: 404,
        statusMessage: 'Conversation not found',
      })

    if (!conversation.name && !conversation.isGroup) {
      conversation.name =
        (
          await db.query.usersToConversations.findFirst({
            where: and(
              eq(usersToConversations.conversationId, conversationId),
              ne(usersToConversations.userId, event.context.user.id),
            ),
            columns: {},
            with: {
              user: {
                columns: {
                  username: true,
                },
              },
            },
          })
        )?.user.username || null
    }

    return {
      name: conversation.name,
      isGroup: conversation.isGroup,
      users: conversation.usersToConversations.map((utc) => utc.user),
    }
  } catch (error) {
    handleError(error)
  }
})
