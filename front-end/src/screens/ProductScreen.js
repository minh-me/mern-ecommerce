import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'

import { Rating } from '../components/Rating'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'

import { getProduct } from '../redux/actions'
import { productSelector } from '../redux/selectors'

export const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, error, product } = useSelector(productSelector)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch, id])

  const handleAddProductToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        product && (
          <Row>
            <Col xs={12} md={6}>
              <Image src={product.image} fluid alt={product.name} />
            </Col>
            <Col xs={6} md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} views`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col xs={6} md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>$ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty: </Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={handleAddProductToCart}
                      className='btn w-100 btn-dark'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      )}
    </>
  )
}
