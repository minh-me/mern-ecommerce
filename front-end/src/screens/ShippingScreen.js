import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FormContainer } from '../components/FormContainer'
import { cartSelector } from '../redux/selectors'
import { Input } from '../components/forms/Input'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { saveShippingAddress } from '../redux/actions/cartActions'

export const ShippingScreen = () => {
  const { shippingAddress } = useSelector(cartSelector)
  const [name, setName] = useState(shippingAddress.name || '')
  const [phone, setPhone] = useState(shippingAddress.phone || '')
  const [address, setAddress] = useState(shippingAddress.address || '')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = event => {
    event.preventDefault()
    dispatch(saveShippingAddress({ name, phone, address }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <h6 className='text-center py-3 heading'>Shipping Address</h6>

      <Form onSubmit={submitHandler}>
        <Input
          label='Full Name'
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Enter full name'
        />
        <Input
          label='Address'
          name='address'
          placeholder='Enter address'
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
        <Input
          label='Phone'
          name='phone'
          placeholder='Enter phone'
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <div className='d-grid gap-2'>
          <Button type='submit' variant='dark'>
            Continute
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}
