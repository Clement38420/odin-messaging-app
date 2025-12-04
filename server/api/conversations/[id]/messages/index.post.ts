export default defineEventHandler(async (event) => {
  const conversationId = Number(getRouterParam(event, 'id'))
  await requireConversationAccess(event, conversationId)

  const body = await readBody(event)

  const { content } = validateSchema(messageCreateSchema, body)

  try {
    const message = await db.transaction(async (tx) => {
      await tx
        .update(usersToConversations)
        .set({
          lastSeenAt: new Date(),
        })
        .where(eq(usersToConversations.userId, event.context.user.id))

      return (
        await tx
          .insert(messages)
          .values({
            conversationId,
            senderId: event.context.user.id,
            content,
          })
          .returning()
      )[0]
    })

    return message
  } catch (error) {
    handleError(error)
  }
})
