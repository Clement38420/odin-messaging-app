export default defineEventHandler(async (event) => {
  const conversationId = Number(getRouterParam(event, 'id'))
  await requireConversationAccess(event, conversationId)

  try {
    await db
      .delete(usersToConversations)
      .where(
        and(
          eq(usersToConversations.conversationId, conversationId),
          eq(usersToConversations.userId, event.context.user.id),
        ),
      )

    sendNoContent(event, 204)
  } catch (error) {
    handleError(error)
  }
})
