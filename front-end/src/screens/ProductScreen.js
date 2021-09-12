import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux" 
import { Row, Col, Image, Card, ListGroup, Button, Form, ListGroupItem} from "react-bootstrap" 
import Rating from "../components/Rating.js"
import Loader from "../components/Loader.js"
import Meta from "../components/Meta.js"
import Message from "../components/Message.js"
import { listProductsDetails, createProductReview } from "../actions/productActions"
import { underline } from 'colors'


const ProductScreen = ({history, match}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector( state => state.productDetails)
    const {loading, error, product} = productDetails
    
    const productReviewCreate = useSelector( state => state.productReviewCreate)
    const {success: successProductReview, error: errorProductReview} = productReviewCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(successProductReview){
            alert('review submitted')
            setRating(0)
            setComment('')
            dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' })
        }
        dispatch(listProductsDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating, 
            comment,
        }))
    }

    return (
        <>
            <Link to="/" className="btn btn-light my-3">
                Go back
            </Link>
            {loading 
            ? <Loader /> 
            : error 
            ? <Message variant="danger">{error}</Message> 
            : ( 
                <>
                <Meta title={product.name}/>
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>{`price: ${product.price}$`}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                         {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        price:
                                    </Col>
                                    <Col>
                                         <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        status:
                                    </Col>
                                    <Col>
                                         {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'  }
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}


                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                         <Button 
                                         onClick={addToCartHandler}
                                         className="btn-block" 
                                         type="button" 
                                         disabled={product.countInStock == 0 || qty == 0}>
                                             Add To Cart
                                         </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>no reviews</Message> }
                    <ListGroup variant="flush">
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating}/>
                                <p>
                                    {review.createdAt.substring(0, 10)}
                                </p>
                                <p>
                                    {review.comment}
                                </p>
                            </ListGroup.Item>
                        ))}

                        <ListGroup.Item>
                            <h2>Write a customer review</h2>
                            {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                            {userInfo 
                            ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as="select" onChange={(e) => {
                                        setRating(e.target.value)
                                    }} value={rating}>
                                        <option value="">Select...</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as="textarea" row="3" value={comment} onChange={
                                        (e) => {
                                            setComment(e.target.value)
                                        }
                                    }></Form.Control>
                                </Form.Group>
                                <Button type="submit" variant="primary">
                                    Submit Comment
                                </Button>
                            </Form>
                            ) 
                            : <Message><Link to="/login" style={{textDecoration: 'underline'}}>Sign in to write a comment</Link></Message>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>
            )}
            
        </>
    )
}

export default ProductScreen