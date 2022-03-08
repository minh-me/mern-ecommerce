import { Alert } from 'react-bootstrap'

export const Message = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>
}
