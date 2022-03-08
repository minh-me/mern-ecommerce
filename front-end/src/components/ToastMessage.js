import { Toast } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer'
export const ToastMessage = ({ children }) => {
  return (
    <ToastContainer position='bottom-end'>
      <Toast autohide={true} delay={3000} bg='info'>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
