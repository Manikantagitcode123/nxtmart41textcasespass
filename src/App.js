import {Component} from 'react'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import CartSuccessful from './components/CartSuccessful'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }
  updatelocalstorage = () => {
    const {cartList} = this.state
    //console.log(cartList)
    localStorage.setItem('cart', JSON.stringify(cartList))
  }
  componentDidMount() {
    const getlocaldataa = localStorage.getItem('cart')
    const jsdata = JSON.parse(getlocaldataa)
    this.setState({cartList: jsdata})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []}, this.updatelocalstorage)
  }

  incrementCartItemQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }),
      this.updatelocalstorage,
    )
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 0) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (id === eachCartItem.id) {
              const updatedQuantity = eachCartItem.quantity - 1
              return {...eachCartItem, quantity: updatedQuantity}
            }
            return eachCartItem
          }),
        }),
        this.updatelocalstorage,
      )
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({cartList: updatedCartList}, this.updatelocalstorage)
  }

  addCartItem = product => {
    //console.log(product)
    const {cartList} = this.state
    //console.log(cartList)
    const productObject = cartList.filter(
      eachCartItem => eachCartItem.id === product.id,
    )
    //console.log(productObject)

    if (productObject.length != 0) {
      this.setState(
        prevState => ({
          cartList: prevState.cartList.map(eachCartItem => {
            if (productObject.id === eachCartItem.id) {
              const updatedQuantity = eachCartItem.quantity + product.quantity

              return {...eachCartItem, quantity: updatedQuantity}
            }

            return eachCartItem
          }),
        }),
        this.updatelocalstorage,
      )
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList}, this.updatelocalstorage)
    }
  }

  ///
  /*addCartItem = product => {
    //console.log(product.id)
    const {cartList} = this.state
    //console.log(cartList)
    const data = cartList.map(each => {
      if (each.id === product.id) {
        each.quantity = each.quantity + 1
        //console.log(each)
        return each
      }
      return each
    })
    // console.log(each)
    const adding = cartList.filter(each => each.id === product.id)
    //console.log(adding)

    //console.log(data)
    if (data.length === 0 || adding.length === 0) {
      this.setState(
        prevState => (
          {cartList: [...prevState.cartList, product]}, this.updatelocalstorage
        ),
      )
    } else {
      this.setState({cartList: data}, this.updatelocalstorage)
    }

    //console.log(product)

    //   TODO: Update the code here to implement addCartItem
  }
  ///*/

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/cartsuccessful"
            component={CartSuccessful}
          />
          <Route component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
