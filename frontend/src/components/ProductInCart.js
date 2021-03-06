import styles from "../styles/Cart.module.css"
import { connect } from "react-redux"
import { useState } from "react"
import cartActions from "../redux/actions/cartActions"

const ProductInCart = ({
  cartItem,
  deleteACartProduct,
  setPriceTotal,
  updateCartProduct,
}) => {
  const [enableCounter, setEnableCounter] = useState(true)

  const updateCartProductHandler = (operation) => {
    setEnableCounter(false)
    let updatedCartItem = {
      product: cartItem.product,
      quantity:
        operation === "+" ? cartItem.quantity + 1 : cartItem.quantity - 1,
    }
    updateCartProduct(updatedCartItem)
    setEnableCounter(true)
  }

  const photo = cartItem.product.photo.includes("http")
    ? cartItem.product.photo
    : `https://cozydeco.herokuapp.com/${cartItem.product.photo}`

  return (
    <div className={styles.productInCart}>
      <div
        className={styles.productCartPhoto}
        style={{ backgroundImage: `url("${photo}")` }}
      ></div>
      <div className={styles.productCartInfo}>
        <div>
          <h5>{cartItem.product.name}</h5>
          <i
            style={{ cursor: "pointer" }}
            onClick={() => deleteACartProduct(cartItem.product._id)}
            className="fas fa-trash-alt fa-1x"
          ></i>
        </div>
        <div>
          <div className={styles.counter}>
            <i
              className="fas fa-minus"
              onClick={
                cartItem.quantity > 1 && enableCounter
                  ? () => updateCartProductHandler("-")
                  : null
              }
            ></i>
            <p className={styles.amountOrder}>{cartItem.quantity}</p>
            <i
              className="fas fa-plus"
              onClick={
                (cartItem.product.stock > cartItem.quantity && enableCounter && cartItem.product.category !== 'GiftCard')
                  ? () => updateCartProductHandler("+")
                  : null
              }
            ></i>
          </div>
          <p className={styles.priceTotal}>
            $
            {cartItem.product.discount === 0
              ? cartItem.product.price
              : (
                  ((100 - cartItem.product.discount) / 100) *
                  cartItem.product.price
                ).toFixed(2)}
          </p>
          <p className={styles.priceTotal}>
            $
            {(
              (cartItem.product.discount === 0
                ? cartItem.product.price
                : ((100 - cartItem.product.discount) / 100) *
                  cartItem.product.price) * cartItem.quantity
            ).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  deleteACartProduct: cartActions.deleteACartProduct,
  updateCartProduct: cartActions.updateCartProduct,
}
export default connect(null, mapDispatchToProps)(ProductInCart)
