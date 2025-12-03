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
    })

    if (!conversation)
      throw createError({
        statusCode: 404,
        statusMessage: 'Conversation not found',
      })

    if (!conversation.name && !conversation.isGroup) {
      return {
        name:
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
          )?.user.username || null,
      }
    }

    return { name: conversation.name }
  } catch (error) {
    handleError(error)
  }
})
