import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../thunks/ProductThunk';
import type { RootState, AppDispatch } from '../app/store';
import './shoppingCart.css';
import { addToCart, removeFromCart } from './cartSlice';
import { Link } from 'react-router';

function ShoppingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.product);
  const cartProducts = useSelector((state: RootState) => state.cart.prod ?? {});

  useEffect(() => {
    const token = localStorage.getItem('access_token') || '';
    console.log('Access token retrieved from localStorage:', token);
    dispatch(fetchProducts(token));
  }, [dispatch]);

  const handleAddToCart = (product: { id: string | number; name: string; unitPrice: number; stockQuantity: number }) => {
    console.log('Adding product to cart:', product);
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product: { id: string | number; name: string; unitPrice: number; stockQuantity: number }) => {
    console.log('Removing product from cart:', product);
    dispatch(removeFromCart(product.id));
  };

  const isProductInCart = (productId: string) => (cartProducts ?? {}).hasOwnProperty(productId);

  return (
    <div className="shopping-container">
      <div className="shopping-hero">
        <div className="kicker">Shopping experience</div>
        <h1 style={{ margin: '8px 0 8px', fontSize: '32px', lineHeight: 1.2 }}>
          Discover your next favorite item
        </h1>
        <p
          style={{ margin: 0, maxWidth: '700px', fontSize: '15px', lineHeight: 1.6, opacity: 0.95 }}
        >
          Browse curated products, compare styles, and move effortlessly from inspiration to
          checkout.
        </p>
      </div>
      <div className="shopping-cart-illustration">
        <hr className="shopping-divider" />
        <div className="cart-image-card">
          <svg
            className="cart-image-icon"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Shopping cart illustration"
          >
            <path
              d="M20 20H56L52 36H24L20 20Z"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 36H18C14.6863 36 12 38.6863 12 42C12 45.3137 14.6863 48 18 48H50"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="26" cy="50" r="4" fill="currentColor" />
            <circle cx="46" cy="50" r="4" fill="currentColor" />
          </svg>
          <div className="cart-image-caption">
            <Link to="/cart">Your cart is ready for checkout</Link>
          </div>
        </div>
      </div>
      {loading && <div className="loading">Loading products…</div>}
      {error && <div className="error">{error}</div>}

      <div className="shopping-grid">
        {(Array.isArray(products) ? products : []).map((product: any) => {
          const added = isProductInCart(product.id);

          return (
            <div key={product.id} className={`card ${added ? 'added' : ''}`}>
              <div
                className="cardImage"
                style={{
                  background: product.color
                    ? `linear-gradient(135deg, ${product.color} 0%, #e0f2fe 100%)`
                    : undefined,
                }}
              >
                <div className="tag">{product.tag ?? product.name ?? 'Item'}</div>
                <div style={{ marginLeft: 100, float: 'left' }} className="tag">
                  {cartProducts[product.id]?.stockQuantity || 0} in stock
                </div>
              </div>
              <div>Supplier: {product.suppliers?.name || 'Unknown'}</div>
              <div>
                <h3 className="cardTitle">{product.name}</h3>
                <p className="cardSubtitle">Premium design • Fast delivery</p>
              </div>
              <div className="cardFooter">
                <span className="price">${product.unitPrice}</span>
                <div className="cardActions">
                  <button
                    className={`addBtn ${added ? 'added' : ''}`}
                    onClick={() => handleAddToCart({ ...product, stockQuantity: 1 })}
                  >
                    {added ? 'Added' : 'Add to cart'}
                  </button>
                  <button className="removeBtn" onClick={() => handleRemoveFromCart({
                    ...product,
                  })}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShoppingPage;
