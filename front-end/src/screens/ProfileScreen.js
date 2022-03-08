import React, { useEffect } from 'react'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { X } from 'react-bootstrap-icons'

import { useDispatch, useSelector } from 'react-redux'
import { authSelector, orderListMySelector } from '../redux/selectors'
import { ProfileForm } from '../components/ProfileForm'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { listMyOrders } from '../redux/actions/orderActions'

export const ProfileScreen = () => {
  const { user, success, loading } = useSelector(authSelector)
  const {
    orders,
    loading: loadingOrders,
    error: errorOrders,
  } = useSelector(orderListMySelector)
  console.log({ errorOrders, loadingOrders, orders })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listMyOrders())
  }, [dispatch])

  return (
    <>
      <Row>
        <Col md={3}>
          <h6 className='py-3 heading'>User Profile</h6>
          {loading ? (
            <Loader />
          ) : (
            success && <Message variant='success'>{success}</Message>
          )}

          {user && <ProfileForm user={user} />}
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm p-4'>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>DATE</td>
                  <td>TOTAL</td>
                  <td>PAID</td>
                  <td>DELIVERED</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {!orders.length && (
                  <tr>
                    <td colSpan={6} className='text-center'>
                      <Message>Your order is empty</Message>
                    </td>
                  </tr>
                )}
                {!!orders.length &&
                  orders.map(order => (
                    <tr key={order.id}>
                      {console.log(order)}
                      <td>{order.id}</td>
                      <td>{order?.createdAt?.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <X variant='danger' />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <X variant='danger' />
                        )}
                      </td>
                      <td>
                        <Link to={`/orders/${order.id}`}>
                          <Button variant='light'>Details</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}
