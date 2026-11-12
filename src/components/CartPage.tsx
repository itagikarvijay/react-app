import { Link } from 'react-router-dom';
import './shoppingCart.css';
import type { RootState } from '../app/store';
import { useSelector } from 'react-redux';

function CartPage() {

  const cartItems = useSelector((state: RootState) => state.cart.prod ?? {});

  const subtotal = 0.00; //cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 12;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="cart-hero">
        <div className="cart-kicker">Shopping cart</div>
        <h1 className="cart-title">Your selected items</h1>
        <p className="cart-subtitle">
          Review your cart, adjust quantities, and continue to checkout with confidence.
        </p>
      </div>

      <div className="cart-layout">
        <section className="cart-panel">
          <div className="cart-panel-header">
            <h2 className="cart-panel-title">Cart items</h2>
            <Link to="/order" className="cart-checkout-link">
              Go to checkout
            </Link>
          </div>

          <div className="cart-items-list">
            {Object.entries(cartItems).map(([key, item]) => (
              <div key={key} className="cart-item-row">
                <div className="cart-item-info">
                  <div className="cart-item-color" style={{ background: '#0f766e' }} />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-qty">Qty {item.stockQuantity}</div>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-item-price">${item.unitPrice * item.stockQuantity}</div>
                  <button type="button" className="cart-remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="cart-summary">
          <h2 className="cart-summary-title">Summary</h2>
          <div className="cart-summary-list">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>${subtotal}</strong>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <strong>${shipping}</strong>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <strong>${total}</strong>
            </div>
          </div>

          <button className="cart-cta-btn">Proceed to checkout</button>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;