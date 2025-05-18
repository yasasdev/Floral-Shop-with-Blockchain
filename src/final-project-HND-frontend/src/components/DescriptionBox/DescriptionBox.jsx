import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='description-box'>
        <div className="description-box-navogator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Our products are crafted with premium quality materials, ensuring durability, comfort, and style. Each item undergoes rigorous quality checks to deliver a superior experience that exceeds your expectations. The modern designs complement various occasions, making it a versatile addition to your collection.</p>
            <p>We pride ourselves on ethical manufacturing practices and sustainable sourcing. Our commitment to excellence extends beyond the product itself to encompass customer satisfaction and responsive service. With easy care instructions and long-lasting performance, this product represents exceptional value for your investment.</p>
        </div>
    </div>
  )
}

export default DescriptionBox