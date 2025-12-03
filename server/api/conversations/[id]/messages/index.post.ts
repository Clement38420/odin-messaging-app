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
        senderId: event.context.user.id,
        content,
      })
      .returning()

    await db
      .update(usersToConversations)
      .set({
        lastSeenAt: new Date(),
      })
      .where(eq(usersToConversations.userId, event.context.user.id))

    return message[0]
  } catch (error) {
    handleError(error)
  }
})
