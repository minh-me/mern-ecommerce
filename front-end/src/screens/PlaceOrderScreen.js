import { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cartSelector, orderSelector } from '../redux/selectors'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { Message } from '../components/Message'
import { Link } from 'react-router-dom'
import { createOrder } from '../redux/actions/orderActions'

export const PlaceOrderScreen = () => {
  const cart = useSelector(cartSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { order, success, error } = useSelector(orderSelector)
  console.log({ order, success, error })

  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  // Caculate prices
  const itemsPrice = +addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  const shippingPrice = +addDecimals(itemsPrice > 100 ? 0 : 100)
  const taxPrice = +addDecimals(+(0.15 * itemsPrice).toFixed(2))

  const totalPrice = itemsPrice + shippingPrice + taxPrice

  useEffect(() => {
    if (success) navigate(`/orders/${order.id}`)
  }, [navigate, success, order.id])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        shippingPrice,
        totalPrice,
        taxPrice,
        itemsPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p className='py-0 my-0'>
                <strong>Name: </strong>
                {cart.shippingAddress.name}
              </p>
              <p className='py-0 my-0'>
                <strong>Phone: </strong>
                {cart.shippingAddress.phone}
              </p>
              <p className='py-0 my-0'>
                <strong>Address: </strong>
                {cart.shippingAddress.address}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className='my-3'>
              <h2>Payment Method</h2>
              <p className='py-0 my-0'>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {!cart.cartItems.length ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <div className='d-grid'>
                  <Button
                    type='button'
                    variant='dark'
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
