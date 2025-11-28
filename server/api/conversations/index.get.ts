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
            messages: {
              orderBy: [desc(messages.createdAt)],
              limit: 1,
            },
          },
        },
      },
    })

    return userConversations.map((uc) => {
      const conv = uc.conversation

      let finalName = conv.name
      if (!finalName && !conv.isGroup) {
        const otherUser = conv.usersToConversations.find(
          (utc) => utc.userId !== event.context.userId,
        )
        finalName = otherUser?.user.username || null
      }

      const { usersToConversations: _, messages: m, ...rest } = conv

      return {
        ...rest,
        name: finalName,
        lastMessage: m[0] || null,
      }
    })
  } catch (error) {
    console.log(error)
    errorHandler(error)
  }
})
