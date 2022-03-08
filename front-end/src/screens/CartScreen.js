import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Button, Image, Form, Card } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { Message } from '../components/Message'
import { addToCart, removeFromCart } from '../redux/actions'
import { cartSelector } from '../redux/selectors'

export const CartScreen = () => {
  const { productId } = useParams()
  const { search } = useLocation()
  const { cartItems } = useSelector(cartSelector)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const qty = search ? +search.split('=')[1] : 1

  useEffect(() => {
    productId && dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    navigate(`/sign-in?redirect=shipping`)
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{' '}
            <Button
              type='button'
              className='btn btn-primary'
              size='sm'
              onClick={() => navigate(-1)}
            >
              GO BACK
            </Button>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
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
                  <Col md={3}>{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <Trash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block bg-dark'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
