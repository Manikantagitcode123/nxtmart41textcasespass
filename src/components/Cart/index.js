import CartContext from '../../context/CartContext'
import Footer from '../Footer'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => {
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        console.log(cartList)
        const showEmptyView = cartList.length === 0
        const onClickRemoveAllBtn = () => {
          removeAllCartItems()
        }

        return (
          <>
            <Header />
            <div className="cart-container">
              {showEmptyView ? (
                <div>
                  <li>
                    <EmptyCartView />
                  </li>
                  <li></li>
                  <li></li>
                </div>
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">Items</h1>
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                  <li>
                    <CartListView />
                  </li>

                  <li></li>
                  <li></li>
                </div>
              )}
            </div>
            <Footer />
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
