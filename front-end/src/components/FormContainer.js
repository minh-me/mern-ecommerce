import { Container, Row, Col } from 'react-bootstrap'

export const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}
