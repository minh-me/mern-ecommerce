import { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { savePaymentMethod } from '../redux/actions/cartActions'
import { cartSelector } from '../redux/selectors'

import { FormContainer } from '../components/FormContainer'
import { CheckoutSteps } from '../components/CheckoutSteps'

export const PaymentScreen = () => {
  const { shippingAddress } = useSelector(cartSelector)
  const navigate = useNavigate()

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = event => {
    event.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h6 className='text-center py-3 heading'>Payment Method</h6>

      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='paypal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Check
              type='radio'
              label='Stripe'
              id='stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={e => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button type='submit' variant='dark'>
          Continute
        </Button>
      </Form>
    </FormContainer>
  )
}
