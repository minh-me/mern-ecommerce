import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../redux/selectors'
import { getUser, updateUser } from '../redux/actions/userActions'

import { FormContainer } from '../components/FormContainer'
import { Input } from '../components/forms/Input'
import { Select } from '../components/forms/Select'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'

export const UserEditScreen = () => {
  const { userId } = useParams()
  const { user, loading, error } = useSelector(userSelector)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser(userId))
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    }
  }, [dispatch, userId])

  const submitHandler = event => {
    event.preventDefault()
    dispatch(updateUser(userId, { email, name, role }))
    navigate('/admin/userlist')
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Back
      </Link>
      <FormContainer>
        <h6 className='text-center py-3 heading'>Edit User</h6>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Input
              label='Full Name'
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Enter full name'
            />
            <Input
              label='Email'
              name='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Select
              label='Role'
              name='role'
              defaultOption={role}
              options={[
                role !== 'user'
                  ? { value: 'user', label: 'user' }
                  : { value: 'admin', label: 'admin' },
              ]}
              onChange={e => setRole(e.target.value)}
            />

            <div className='d-grid gap-2'>
              <Button type='submit' variant='dark'>
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
