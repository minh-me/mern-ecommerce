import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { FormContainer } from '../components/FormContainer'
import { register } from '../redux/actions/authActions'
import { authSelector } from '../redux/selectors'
import { FormControl } from '../components/forms/FormControl'

const registerSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  phone: Yup.string().required().label('Phone'),
  gender: Yup.mixed()
    .oneOf(['male', 'female', 'other'])
    .required()
    .label('Gender'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).max(30).label('Password'),
  birthday: Yup.string().required().label('Birthday'),
})

export const RegisterScreen = () => {
  const initialValues = {
    name: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
    birthday: '',
  }
  const { handleSubmit, control } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    resolver: yupResolver(registerSchema),
  })

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const { isLoggedIn, error, loading } = useSelector(authSelector)

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    isLoggedIn && navigate(redirect)
  }, [navigate, redirect, isLoggedIn])

  const onSubmit = data => {
    dispatch(register(data))
  }
  return (
    <FormContainer>
      <h6 className='text-center py-3 heading'>Sign Up</h6>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          label='Full name'
          name='name'
          control={control}
          placeholder='Enter full name'
        />
        <FormControl
          label='Email'
          name='email'
          type='email'
          control={control}
          placeholder='Enter email'
        />
        <FormControl
          label='Phone'
          name='phone'
          control={control}
          placeholder='Enter phone number'
        />
        <FormControl
          label='Password'
          name='password'
          type='password'
          control={control}
          placeholder='Enter password'
        />
        <FormControl
          label='Date of birth'
          name='birthday'
          type='date'
          control={control}
        />
        <FormControl
          type='radio'
          control={control}
          name='gender'
          label='Gender'
          options={[
            { value: 'female', label: 'Female' },
            { value: 'male', label: 'Male' },
            { value: 'other', label: 'Other' },
          ]}
        />
        <div className='d-grid gap-2'>
          <Button type='submit' variant='dark'>
            Sign Up
          </Button>
        </div>
      </Form>

      <Row className='py-3' style={{ fontSize: '14px' }}>
        <Col>
          New Customer?
          <Link
            className='text-decoration-none text-primary ms-2 fw-bold'
            to={redirect ? `/sign-in?redirect=${redirect}` : '/sign-in'}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
