import { z } from 'zod'

z.config({
  customError: (iss) => {
    switch (iss.code) {
      case 'too_small':
        switch (typeof iss.input) {
          case 'string':
            if (iss.input === '') return 'This field is required'
            else return `This field must be at least ${iss.minimum} characters`

          case 'number':
            return `This field must be greater than ${iss.minimum}`
        }
        break

      case 'invalid_type':
        if (iss.input === null || iss.input === undefined)
          return 'This field is required'
        else return `This field must be a ${iss.expected}`

      case 'too_big':
        switch (typeof iss.input) {
          case 'string':
            return `This field must be lower than ${iss.maximum} characters`

          case 'number':
            return `This field must be lower than ${iss.maximum}`
        }
        break

      case 'invalid_format':
        switch (iss.format) {
          case 'email':
            return 'Invalid email address format'
        }
        break

      default:
        return 'Unknown error'
    }
  },
})

//#region User Schemas
const userBaseSchema = z.object({
  id: z.int(),
  email: z.email().meta({ description: 'Email address' }),
  username: z.string().max(255).min(1).meta({ description: 'Username' }),
  password: z
    .string()
    .min(1)
    .meta({ description: 'Password', type: 'password' }),
  bio: z
    .string()
    .max(500)
    .optional()
    .meta({ description: 'Bio', type: 'textarea' }),
})

export const userLoginSchema = userBaseSchema.pick({
  username: true,
  password: true,
})

export const userRegisterSchema = userBaseSchema
  .pick({
    email: true,
    username: true,
    bio: true,
    password: true,
  })
  .extend({
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must be 8 characters long, contains one lower and one uppercase letter, and one special characters.',
      )
      .meta({ description: 'Password', type: 'password' }),
    confirmPassword: z
      .string()
      .min(1)
      .meta({ description: 'Confirm Password', type: 'password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const userProfileSchema = userBaseSchema.pick({
  email: true,
  username: true,
  bio: true,
})
//#endregion

//#region Message Schemas
export const messageBaseSchema = z.object({
  id: z.int(),
  conversationId: z.int(),
  senderId: z.int(),
  content: z.string().trim().min(1).max(2000).meta({ description: 'Message' }),
  createdAt: z.coerce.string(),
})

export const messageCreateSchema = messageBaseSchema.pick({
  content: true,
})
//#endregion

//#region Conversation Schemas
export const conversationBaseSchema = z.object({
  id: z.int(),
  name: z
    .string()
    .max(100)
    .nullable()
    .default(null)
    .meta({ description: 'Conversation Name' }),
  isGroup: z.boolean().meta({ description: 'Is Group Conversation' }),
})
export type Conversation = z.infer<typeof conversationBaseSchema>

export const conversationSnippetSchema = conversationBaseSchema.extend({
  lastMessage: messageBaseSchema.nullable().optional(),
  lastSeenAt: z.coerce.string().nullable(),
})
export type ConversationSnippet = z.infer<typeof conversationSnippetSchema>
//#endregion
