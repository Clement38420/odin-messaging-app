import {
  integer,
  pgTable,
  varchar,
  boolean,
  primaryKey,
  timestamp,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 50 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  bio: varchar({ length: 255 }),
})

export const usersRelations = relations(users, ({ many }) => ({
  usersToConversations: many(usersToConversations),
  messages: many(messages),
}))

export const conversations = pgTable('conversations', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }),
  isGroup: boolean('is_group').default(false),
})

export const conversationsRelations = relations(conversations, ({ many }) => ({
  usersToConversations: many(usersToConversations),
  messages: many(messages),
}))

export const usersToConversations = pgTable(
  'users_to_conversations',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    conversationId: integer('conversation_id')
      .notNull()
      .references(() => conversations.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.conversationId] })],
)

export const usersToConversationsRelations = relations(
  usersToConversations,
  ({ one }) => ({
    user: one(users, {
      fields: [usersToConversations.userId],
      references: [users.id],
    }),
    conversation: one(conversations, {
      fields: [usersToConversations.conversationId],
      references: [conversations.id],
    }),
  }),
)

export const messages = pgTable('messages', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  conversationId: integer('conversation_id')
    .notNull()
    .references(() => conversations.id),
  senderId: integer('sender_id')
    .notNull()
    .references(() => users.id),
  content: varchar({ length: 1000 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}))
