import { Button } from 'react-bootstrap'
import React from 'react'
import classes from './style.module.css'

const BookListItem = ({ book, addToCart }) => {
    const { id, title, price, author, imgUrl } = book;
    const onAddToCart = () => addToCart(id)

    return (
        <div className={classes.list_item} itemScope itemProp='http://scheme.org/Product'>
            <div className={classes.list_item_cower}>
                <img src={imgUrl} alt="book" />
            </div>
        
            <div className={classes.list_item_details} itemScope itemProp='http://scheme.org/Review'>
                <h4>{title}</h4>
                <div itemProp='http://scheme.org/author'>{author}</div>
                <div className={classes.list_item_price}>{price}$</div>
                <Button onClick={onAddToCart}>Add to cart</Button>
            </div>
        </div>
    )
}
export default BookListItem;