import { forwardRef } from 'react'
import { Form } from 'react-bootstrap'

export const RadioButtons = forwardRef(
  ({ label, error, options, defaultChecked, ...rest }, ref) => {
    return (
      <Form.Group className='mb-3'>
        <div>{label}</div>
        {options.map(option => (
          <Form.Check
            {...rest}
            defaultChecked={defaultChecked === option.value}
            value={option.value}
            disabled={option.disabled}
            label={option.label}
            type='radio'
            inline
            ref={ref}
            id={option.value}
            key={option.label}
            isInvalid={error}
          />
        ))}
      </Form.Group>
    )
  }
)
