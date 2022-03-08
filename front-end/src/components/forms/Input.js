import { forwardRef } from 'react'
import { Form } from 'react-bootstrap'

export const Input = forwardRef(({ label, name, error, ...rest }, ref) => {
  return (
    <Form.Group className='mb-3' controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} ref={ref} {...rest} isInvalid={error} />
      {error && (
        <Form.Control.Feedback type='invalid'>
          {error.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  )
})
