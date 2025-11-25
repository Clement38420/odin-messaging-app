import type { H3Event } from 'h3'

export async function requireConversationAccess(
  event: H3Event,
  conversationId: number,
) {
  const userId = event.context.userId
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const link = await db.query.usersToConversations.findFirst({
    where: and(
      eq(usersToConversations.userId, userId),
      eq(usersToConversations.conversationId, conversationId),
    ),
  })

  if (!link) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied to this conversation',
    })
  }
}
