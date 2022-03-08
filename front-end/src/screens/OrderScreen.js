import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../redux/actions/orderActions'
import { orderDetailsSelector } from '../redux/selectors'

import { Message } from '../components/Message'
import { Loader } from '../components/Loader'

export const OrderScreen = () => {
  const { orderId } = useParams()
  const { order, error, loading } = useSelector(orderDetailsSelector)
  console.log({ order, error, loading })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [orderId, dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : order.id ? (
    <>
      <h1>Order {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p className='py-0 my-0'>
                <strong>Name: </strong>
                {order.shippingAddress.name}
              </p>
              <p className='py-0 my-0'>
                <strong>Phone: </strong>
                {order.shippingAddress.phone}
              </p>
              <p className='py-0 my-0'>
                <strong>Address: </strong>
                {order.shippingAddress.address}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p className='py-0 my-0'>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {!order.orderItems.length ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            style={{
                              textDecoration: 'none',
                              color: '#555656',
                              fontSize: '14px',
                            }}
                            to={`/products/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x $ {item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  ) : (
    <Loader />
  )
}
