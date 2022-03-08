import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Modal } from 'react-bootstrap'
import { PencilSquare, XSquare } from 'react-bootstrap-icons'
import { userSelector } from '../redux/selectors'
import { deleteUser, listUsers } from '../redux/actions/userActions'

import { Message } from '../components/Message'
import { Loader } from '../components/Loader'

export const UserListScreen = () => {
  const { users, loading, error } = useSelector(userSelector)
  const dispatch = useDispatch()
  const [userId, setUserId] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = id => {
    setUserId(id)
    setShowModal(true)
  }
  const deleteUserHandler = () => {
    dispatch(deleteUser(userId))
    setShowModal(false)
  }

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered responsive className='table-sm'>
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>EMAIL</td>
              <td>ROLE</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/admin/users/${user.id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <PencilSquare />
                    </Button>
                  </Link>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    disabled={user.role === 'admin'}
                    onClick={() => handleShowModal(user.id)}
                  >
                    <XSquare />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body className='my-0 pt-3 pb-0'>
          <p variant='danger'>Delete user {userId}.</p>
        </Modal.Body>

        <Modal.Footer className='my-0 py-2'>
          <Button
            onClick={deleteUserHandler}
            className='btn-sm'
            variant='danger'
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
