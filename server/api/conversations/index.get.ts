export default defineEventHandler(async (event) => {
  try {
    const userConversations = await db.query.usersToConversations.findMany({
      where: eq(usersToConversations.userId, event.context.userId),
      with: {
        conversation: {
          with: {
            usersToConversations: {
              with: {
                user: {
                  columns: {
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return userConversations.map((uc) => {
      const conv = uc.conversation

      if (!conv.name && !conv.isGroup) {
        const otherUser = conv.usersToConversations.find(
          (utc) => utc.userId !== event.context.userId,
        )
        conv.name = otherUser?.user.username || null
      }

      return conv
    })
  } catch (error) {
    errorHandler(error)
  }
})
