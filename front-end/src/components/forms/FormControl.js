import { useController } from 'react-hook-form'
import { Input } from './Input'
import { Select } from './Select'
import { Textarea } from './Textarea'
import { RadioButtons } from './RadioButtons'

export const FormControl = ({ type, name, control, ...rest }) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, name })

  switch (type) {
    case 'select':
      return <Select {...field} {...rest} error={invalid && error} />

    case 'textarea':
      return <Textarea {...field} {...rest} error={invalid && error} />

    case 'radio':
      return <RadioButtons {...field} {...rest} error={invalid && error} />

    default:
      return <Input type={type} {...field} {...rest} error={invalid && error} />
  }
}
