import "./Cart.css";
import React, { useContext } from "react";
import { CartContext } from "../../../Services/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // חישוב הסכום הכולל של המוצרים
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // איסוף כל הערכים מהטופס
    const fullName = document.getElementById("name").value.trim();
    const cardNumber1 = document.getElementById("number").value.trim();
    const cardNumber2 = document.getElementById("number2").value.trim();
    const cardNumber3 = document.getElementById("number3").value.trim();
    const cardNumber4 = document.getElementById("number4").value.trim();
    const cvc = document.getElementById("cvc").value.trim();
    const expiry = document.getElementById("expire-month").value.trim();

    // בדיקה אם כל השדות מלאים
    if (
      !fullName ||
      !cardNumber1 ||
      !cardNumber2 ||
      !cardNumber3 ||
      !cardNumber4 ||
      !cvc ||
      !expiry
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // יצירת אובייקט להזמנה
    const order = {
      customerName: fullName,
      cardNumber: `${cardNumber1}-${cardNumber2}-${cardNumber3}-${cardNumber4}`,
      cvc,
      expiry,
      items: cart,
      total: totalPrice,
    };

    // שמירת ההזמנה ב-localStorage (לצורך סימולציה)
    localStorage.setItem("order", JSON.stringify(order));

    // ניקוי העגלה לאחר הרכישה
    clearCart();

    // העברה לדף הבית
    window.location.href = "/";
  };

  return (
    <div className="cartPage">
      <section className="cart">
        <header>
          <h1>Your Cart</h1>
        </header>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="image" />
                <div className="details">
                  <p className="title">{item.name}</p>
                  <p className="price">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <button
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="total">
              <p className="title">Total:</p>
              <p className="price">${totalPrice.toFixed(2)}</p>
            </div>
          </>
        ) : (
          <p className="empty-cart">Your cart is empty.</p>
        )}
      </section>
      {cart.length > 0 && (
        <section className="checkout">
          <header>
            <h1>Checkout</h1>
            <p>by Credit Card</p>
          </header>
          <form action="post">
            <div className="input-group">
              <div className="label">
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="input">
                <input type="text" id="name" placeholder="Jane Doe" required />
              </div>
            </div>
            <div className="input-group">
              <div className="label">
                <label htmlFor="number">Card Number</label>
              </div>
              <div className="input number">
                <input
                  type="number"
                  min="1000"
                  max="9999"
                  id="number"
                  placeholder="0000"
                  required
                />
                <span>&ndash;</span>
                <input
                  type="number"
                  min="1000"
                  max="9999"
                  id="number2"
                  placeholder="0000"
                  required
                />
                <span>&ndash;</span>
                <input
                  type="number"
                  min="1000"
                  max="9999"
                  id="number3"
                  placeholder="0000"
                  required
                />
                <span>&ndash;</span>
                <input
                  type="number"
                  min="1000"
                  max="9999"
                  id="number4"
                  placeholder="0000"
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <div className="label">
                <label htmlFor="cvc">Security Code</label>
              </div>
              <div className="input">
                <input
                  type="number"
                  id="cvc"
                  placeholder="000"
                  min="001"
                  max="999"
                  step="1"
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <div className="label">
                <label htmlFor="expire-month">Expiry</label>
              </div>
              <div className="input">
                <input type="month" id="expire-month" required />
              </div>
            </div>
            <div
              className="checkout-btn"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCheckout}
              >
                Charge Credit Card
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

export default Cart;
