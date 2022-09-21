import React from 'react'
import "./cart.css";
import { Link } from 'react-router-dom';
import GooglePayButton from '@google-pay/button-react'
export const Cart = (props) => {
  const data = props.data;
  const cartItems = props.cartItems
  const handleAddProduct = props.handleAddProduct
  const handleRemoveProducts = props.handleRemoveProducts
  const handleCartClearane = props.handleCartClearane

  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0)
  return (
    <div className='cart-item'>
      <div>
        {cartItems.length === 0 && <div>No items are added</div>}
      </div>
      <div  >
        {cartItems.length >= 1 && (
          <button className='ClearCart' onClick={() => handleCartClearane()}>Clear Cart</button>
        )}
      </div>
      <div>
        <table table id="customers">
          <thead>
            <tr>
              <th>sr</th>
              <th>product Image</th>
              <th>title</th>
              <th>categories</th>
              <th>color</th>
              <th>description</th>
              <th>size</th>
              <th>productId</th>
              <th>Price</th>
              <th>Action</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td><img src={item.img} style={{ width: "100px", height: "70px" }} /></td>
                  <td>{item.title}</td>
                  <td>{item.categories}</td>
                  <td>{item.color}</td>
                  <td>{item.desc}</td>
                  <td>{item.size}</td>
                  <td>{item.productId}</td>
                  <td>{item.price}</td>
                  <td >
                    <button className='round-1' onClick={() => handleAddProduct(item)}>+</button>
                    <button className='round-2' onClick={() => handleRemoveProducts(item)}>-</button>
                  </td>
                  <div>
                    {item.quantity}*{item.price}
                  </div>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='totalPrice'>
        Total Price
        <div className='totalPrice'>
          Rs.{totalPrice}/-
        </div>
        <div >
          <GooglePayButton
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: 'CARD',
                  parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                  },
                  tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                      gateway: 'example',
                      gatewayMerchantId: 'exampleGatewayMerchantId',
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: '12345678901234567890',
                merchantName: 'Demo Merchant',
              },
              transactionInfo: {
                totalPriceStatus: 'FINAL',
                totalPriceLabel: 'Total',
                totalPrice: '1',
                currencyCode: 'USD',
                countryCode: 'US',
              },
              shippingAddressRequired: true,
              callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
            }}
            onLoadPaymentData={paymentRequest => {
              console.log('Success', paymentRequest);
            }}
            onPaymentAuthorized={paymentData => {
              console.log('Payment Authorised Success', paymentData)
              return { transactionState: 'SUCCESS' }
            }
            }
            onPaymentDataChanged={paymentData => {
              console.log('On Payment Data Changed', paymentData)
              return {}
            }
            }
            existingPaymentMethodRequired='false'
            buttonColor='black'
            buttonType='Buy'
          />
        </div>
      </div>
    </div>

  )
}




