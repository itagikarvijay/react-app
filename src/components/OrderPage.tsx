import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { RootState, AppDispatch } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { order } from './OrderSlice';
import { placeOrder } from '../thunks/OrderThunk';

function OrderPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.prod ?? {});

  const [quantities, setQuantities] = useState<Record<string, number>>({
    '1': 1,
    '2': 1,
  });
  const [shipping, setShipping] = useState('Express');
  const [payment, setPayment] = useState('Card');

  const subtotal = Object.values(cartItems).reduce(
    (total, item) => total + item.unitPrice * (quantities[item.id] || 1),
    0,
  );
  const shippingFee = shipping === 'Express' ? 12 : 5;
  const total = subtotal + shippingFee;

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 1) + delta),
    }));
  };

  const submitOrder = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Implement order submission logic here
    console.log('Order submitted with the following details:');
    let token = localStorage.getItem('token') || '';
    dispatch(order({ id: Date.now(), OrderDetails: { productId: 1, quantity: 1, price: 10 }, loading: false, error: null, login: false }));
    dispatch(placeOrder(token));
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1d4ed8 45%, #38bdf8 100%)',
          borderRadius: '24px',
          padding: '28px',
          color: '#f8fafc',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            opacity: 0.9,
          }}
        >
          Shopping order
        </div>
        <h1 style={{ margin: '8px 0 8px', fontSize: '32px', lineHeight: 1.2 }}>
          Complete your order in minutes
        </h1>
        <p
          style={{ margin: 0, maxWidth: '680px', fontSize: '15px', lineHeight: 1.6, opacity: 0.95 }}
        >
          Secure checkout, fast delivery, and a smooth experience from cart to doorstep.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <section
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
              }}
            >
              <h2 style={{ margin: 0, color: '#111827', fontSize: '20px' }}>Delivery address</h2>
              <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '13px' }}>Edit</span>
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input style={inputStyle} placeholder="First name" />
                <input style={inputStyle} placeholder="Last name" />
              </div>
              <input style={inputStyle} placeholder="Street address" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input style={inputStyle} placeholder="City" />
                <input style={inputStyle} placeholder="ZIP code" />
              </div>
            </div>
          </section>

          <section
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
            }}
          >
            <h2 style={{ margin: '0 0 14px', color: '#111827', fontSize: '20px' }}>
              Payment method
            </h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Card', 'PayPal', 'Cash on delivery'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPayment(method)}
                  style={{
                    ...pillButtonStyle,
                    background: payment === method ? '#2563eb' : '#f8fafc',
                    color: payment === method ? '#ffffff' : '#334155',
                    border: payment === method ? '1px solid #2563eb' : '1px solid #e2e8f0',
                  }}
                >
                  {method}
                </button>
              ))}
            </div>
          </section>

          <section
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <h2 style={{ margin: 0, color: '#111827', fontSize: '20px' }}>Your items</h2>
              <Link
                to="/"
                style={{
                  color: '#2563eb',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '13px',
                }}
              >
                Continue shopping
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(cartItems).map(([, item]) => {
                const quantity = quantities[item.id] || 1;
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: "#r45455",
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.name}</div>
                        {/* <div style={{ fontSize: '13px', color: '#64748b' }}>{item.detail}</div> */}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #e2e8f0',
                          borderRadius: '999px',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity("" + item.id, -1)}
                          style={quantityButtonStyle}
                        >
                          −
                        </button>
                        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700 }}>
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity("" + item.id, 1)}
                          style={quantityButtonStyle}
                        >
                          +
                        </button>
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: '#111827',
                          minWidth: '56px',
                          textAlign: 'right',
                        }}
                      >
                        ${item.unitPrice * quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
            position: 'sticky',
            top: '16px',
          }}
        >
          <h2 style={{ margin: '0 0 14px', color: '#111827', fontSize: '20px' }}>Order summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#475569' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <strong>${subtotal}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping</span>
              <strong>{shippingFee === 12 ? '$12' : '$5'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Discount</span>
              <strong>-$0</strong>
            </div>
            <div
              style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '18px',
                color: '#111827',
              }}
            >
              <span>Total</span>
              <strong>${total}</strong>
            </div>
          </div>

          <div style={{ marginTop: '14px' }}>
            <label
              style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '6px' }}
            >
              Delivery speed
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Express', 'Standard'].map((option) => (
                <button
                  key={option}
                  onClick={() => setShipping(option)}
                  style={{
                    ...pillButtonStyle,
                    background: shipping === option ? '#0f172a' : '#f8fafc',
                    color: shipping === option ? '#ffffff' : '#334155',
                    border: shipping === option ? '1px solid #0f172a' : '1px solid #e2e8f0',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button onClick={submitOrder}
            style={{
              width: '100%',
              border: 'none',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              color: '#ffffff',
              padding: '12px 14px',
              marginTop: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.2)',
            }}
          >
            Place order
          </button>
        </aside>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '10px 12px',
  fontSize: '14px',
  boxSizing: 'border-box',
};

const pillButtonStyle: React.CSSProperties = {
  borderRadius: '999px',
  padding: '8px 12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const quantityButtonStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: '#2563eb',
  fontSize: '18px',
  cursor: 'pointer',
  width: '28px',
  height: '28px',
};

export default OrderPage;
