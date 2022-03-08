import { forwardRef } from 'react'
import { Form } from 'react-bootstrap'

export const Textarea = forwardRef(({ label, name, error, ...rest }, ref) => {
  return (
    <Form.Group className='mb-3' controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as='textarea' ref={ref} {...rest} isInvalid={error} />
      {error && (
        <Form.Control.Feedback type='invalid'>
          {error.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  )
})
