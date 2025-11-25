export default defineEventHandler(async (event) => {
  const conversationId = Number(getRouterParam(event, 'id'))
  await requireConversationAccess(event, conversationId)

  try {
    const convMessages = await db.query.messages.findMany({
      where: eq(messages.conversationId, conversationId),
    })

    return convMessages
  } catch (error) {
    errorHandler(error)
  }
})
