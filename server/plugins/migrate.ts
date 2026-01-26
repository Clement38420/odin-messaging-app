import { migrate } from 'drizzle-orm/node-postgres/migrator'
import path from 'node:path'

export default defineNitroPlugin(async () => {
  if (process.env.NODE_ENV === 'production') {
    const migrationFolder = path.join(process.cwd(), 'drizzle')
    await migrate(db, { migrationsFolder: migrationFolder })
    console.log('Successfully migrated database.')
  }
})
