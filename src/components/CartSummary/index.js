import CartContext from '../../context/CartContext'
import './index.css'
import {Redirect, Link, withRouter} from 'react-router-dom'
const CartSummary = props => {
  //console.log(props)
  const checkoutitems = () => {
    const cartList = []
    localStorage.setItem('cart', JSON.stringify(cartList))

    const {history} = props
    history.replace('/cartsuccessful')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price.slice(1) * eachCartItem.quantity
        })

        return (
          <div className="carttotalsection">
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <h1 className="order-total-label">
                  Total (<p>{cartList.length}</p> items): ₹{' '}
                  <p data-testid="total-price">{total}</p>
                </h1>
              </h1>

              <button
                type="button"
                className="checkout-button d-sm-none"
                onClick={checkoutitems}
              >
                Checkout
              </button>
            </div>

            <button
              type="button"
              className="checkout-button d-lg-none"
              onClick={checkoutitems}
            >
              Checkout
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(CartSummary)
