import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../db/schema'
export * from 'drizzle-orm'

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: 'snake_case',
  schema,
})

export async function getUserProfileById(userId: number) {
  return (await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: {
      id: true,
      username: true,
      email: true,
    },
  })) as UserProfile | null
}
