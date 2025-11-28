export default defineEventHandler(async (event) => {
  const conversationId = Number(getRouterParam(event, 'id'))
  await requireConversationAccess(event, conversationId)

  const body = await readBody(event)

  const { content } = validateSchema(messageCreateSchema, body)

  try {
    const message = await db
      .insert(messages)
      .values({
        conversationId,
        senderId: event.context.userId,
        content,
      })
      .returning()

    return message[0]
  } catch (error) {
    errorHandler(error)
  }
})
