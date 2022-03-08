import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { FormControl } from '../components/forms/FormControl'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { FormContainer } from '../components/FormContainer'
import { login } from '../redux/actions/authActions'
import { authSelector } from '../redux/selectors'

const loginSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).max(30).label('Password'),
})

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const { isLoggedIn, error, loading } = useSelector(authSelector)

  const redirect = location.search ? location.search.split('=')[1] : ''
  console.log(redirect)
  useEffect(() => {
    isLoggedIn && navigate(`/${redirect}`)
  }, [navigate, redirect, isLoggedIn])

  const { handleSubmit, control } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = ({ email, password }) => {
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h6 className='text-center py-3 heading'>Sign In</h6>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          label='Email'
          name='email'
          control={control}
          placeholder='Enter email'
        />
        <FormControl
          type='password'
          label='Password'
          name='password'
          control={control}
          placeholder='Enter password'
        />
        <div className='d-grid gap-2'>
          <Button type='submit' variant='dark'>
            Sign In
          </Button>
        </div>
      </Form>

      <Row className='py-3' style={{ fontSize: '14px' }}>
        <Col>
          New Customer?
          <Link
            className='text-decoration-none text-primary ms-2 fw-bold'
            to={redirect ? `/sign-up?redirect=${redirect}` : '/sign-up'}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
