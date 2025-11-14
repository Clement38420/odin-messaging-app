import type { InferSelectModel } from 'drizzle-orm'
import type * as schema from '../../server/db/schema'

export type User = InferSelectModel<typeof schema.users>
export type UserProfile = Omit<User, 'password'>
