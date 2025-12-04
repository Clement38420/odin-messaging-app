export type FormFieldProps = {
  name: string
  title: string
  type?: string
  required?: boolean
}

export type FormField = {
  value: unknown
  props: FormFieldProps
}
