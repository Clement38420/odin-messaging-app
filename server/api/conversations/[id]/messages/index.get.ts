export default defineEventHandler(async (event) => {
  const conversationId = Number(getRouterParam(event, 'id'))
  await requireConversationAccess(event, conversationId)

  try {
    const convMessages = await db.query.messages.findMany({
      where: eq(messages.conversationId, conversationId),
      with: {
        sender: {
          columns: {
            id: true,
            username: true,
          },
        },
      },
    })

    await db
      .update(usersToConversations)
      .set({
        lastSeenAt: new Date(),
      })
      .where(eq(usersToConversations.userId, event.context.user.id))

    return convMessages
  } catch (error) {
    handleError(error)
  }
})
