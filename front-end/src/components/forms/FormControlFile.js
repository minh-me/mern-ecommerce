import { Form } from 'react-bootstrap'

export const FormControlFile = ({ label, name, register, error, ...rest }) => {
  return (
    <Form.Group className='mb-3 ' controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type='file' {...register(name)} {...rest} />
    </Form.Group>
  )
}
