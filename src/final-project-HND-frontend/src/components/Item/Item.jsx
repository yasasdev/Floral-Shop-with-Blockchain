import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

const Item = (props) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img onClick={handleClick} src={props.image} alt="" /></Link> 
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                Rs {props.new_price}
            </div>
            <div className="item-price-old">
                Rs {props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item