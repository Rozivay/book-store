import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchAllCart, { addBookToCart, removeFromCart, removeToCart } from '../../store/reducers/cartReducers'
import { Table, Button } from 'react-bootstrap'

const Cart = () => {
  const dispatch = useDispatch()
  const { cart, cartError, isCartLoading } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchAllCart())
  }, [])

  const renderItems = (item, idx) => {
    const { title, count, total, id } = item;

    const onAddToCart = () => dispatch(addBookToCart(id))
    const onRemoveFromCart = () => dispatch(removeToCart(id))
    const onRemove = () => dispatch(removeFromCart(id))

    return (
      <tr key={`item-${id}`}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>{total}$</td>
        <td>
          <Button variant='outline-success' className='mx-1' onClick={onAddToCart}>
            <i className='fa-solid fa-plus'></i>
          </Button>
          <Button variant='outline-warnings' className='mx-1' onClick={onRemoveFromCart}>
            <i className='fa-solid fa-minus'></i>
          </Button>
          <Button variant='outline-danger' className='mx-1' onClick={onRemove}>
            <i className='fa-solid fa-trash'></i>
          </Button>
        </td>
      </tr>
    )
  };


  return (
    <div>
      <h2>Your order</h2>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Conut</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{cart?.map(renderItems)}</tbody>
      </Table>
    </div>
  )
}

export default Cart