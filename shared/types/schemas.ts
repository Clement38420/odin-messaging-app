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
        switch (iss.type) {
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

const userBaseSchema = z.object({
  id: z.int(),
  email: z.email().meta({ description: 'Email address' }),
  username: z.string().max(255).min(1).meta({ description: 'Username' }),
  password: z.string().min(1).meta({ description: 'Password', password: true }),
})

export const userLoginSchema = userBaseSchema.pick({
  username: true,
  password: true,
})

export const userRegisterSchema = userBaseSchema
  .pick({
    email: true,
    username: true,
    password: true,
  })
  .extend({
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must be 8 characters long, contains one lower and one uppercase letter, and one special characters.',
      )
      .meta({ description: 'Password', password: true }),
    confirmPassword: z
      .string()
      .min(1)
      .meta({ description: 'Confirm Password', password: true }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const userProfileSchema = userBaseSchema.pick({
  email: true,
  username: true,
})
