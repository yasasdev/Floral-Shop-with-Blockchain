import React, { useState } from 'react';
import './CSS/Payment.css';

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    amount: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    }

    if (name === 'expiryDate') {
      formattedValue = value.replace(/\//g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.cardNumber || !/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) {
      errors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!formData.cardHolderName) {
      errors.cardHolderName = 'Card holder name is required';
    }

    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = 'Please enter a valid CVV';
    }

    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Please enter a valid amount';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      setFormErrors({});
      console.log('Payment processed:', formData);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Payment Details</h1>

      {isSubmitted ? (
        <div className="success-message">
          <h2>Payment Successful!</h2>
          <p>Thank you for your payment. Your transaction has been completed successfully.</p>
        </div>
      ) : (
        <>
          <div className="payment-card">
            <div className="card-chip"></div>
            <div className="card-details">
              <div className="card-number">{formData.cardNumber || 'XXXX XXXX XXXX XXXX'}</div>
              <div className="card-info">
                <div className="card-name">{formData.cardHolderName || 'CARD HOLDER'}</div>
                <div className="card-expiry">{formData.expiryDate || 'MM/YY'}</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                className="form-control"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength="19"
              />
              {formErrors.cardNumber && <div className="error-message">{formErrors.cardNumber}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Card Holder Name</label>
              <input
                type="text"
                name="cardHolderName"
                className="form-control"
                placeholder="John Doe"
                value={formData.cardHolderName}
                onChange={handleChange}
              />
              {formErrors.cardHolderName && <div className="error-message">{formErrors.cardHolderName}</div>}
            </div>

            <div className="row">
              <div className="col form-group">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  className="form-control"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  maxLength="5"
                />
                {formErrors.expiryDate && <div className="error-message">{formErrors.expiryDate}</div>}
              </div>

              <div className="col form-group">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  className="form-control"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength="4"
                />
                {formErrors.cvv && <div className="error-message">{formErrors.cvv}</div>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Amount</label>
              <input
                type="text"
                name="amount"
                className="form-control"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
              />
              {formErrors.amount && <div className="error-message">{formErrors.amount}</div>}
            </div>

            <button type="submit" className="submit-btn">Pay Now</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Payment;
