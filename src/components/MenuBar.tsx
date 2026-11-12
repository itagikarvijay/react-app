import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../feature/auth/userSlice';

const menuItems = [
  { label: 'Weather', href: '/Weather' },
  { label: 'Services', href: '/Services' },
  { label: 'About', href: '/About' },
  { label: 'Contact', href: '/Contact' },
];

function MenuBar() {
  const [showServices, setShowServices] = useState(false);
  const servicesRef = useRef<HTMLLIElement | null>(null);
  const profile = useSelector((state: RootState) => state.auth.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setShowServices(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 140px 10px 14px',
          background: '#1f2937',
          color: '#f9fafb',
          borderRadius: '8px',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.12)',
          marginBottom: '18px',
        }}
      >
        <div style={{ fontSize: '15px', fontWeight: 700, marginLeft: '20px' }}>
          <Link to="/" style={{ color: '#f9fafb', textDecoration: 'none' }}>
            Weather App
          </Link>
        </div>
        <ul
          style={{
            display: 'flex',
            gap: '16px',
            listStyle: 'none',
            marginLeft: '140px',
            padding: 0,
            fontSize: '13px',
          }}
        >
          {menuItems.map((item) => (
            <li
              key={item.label}
              ref={item.label === 'Services' ? servicesRef : null}
              style={{ position: 'relative' }}
            >
              {item.label === 'Services' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Link
                    to={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      setShowServices((current) => !current);
                    }}
                    style={{
                      color: '#f9fafb',
                      textDecoration: 'none',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'opacity 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {item.label}
                    <span style={{ fontSize: '10px', lineHeight: 1 }}>
                      {showServices ? '▴' : '▾'}
                    </span>
                  </Link>
                  <ul
                    style={{
                      position: 'absolute',
                      top: '24px',
                      left: 0,
                      background: '#111827',
                      padding: '6px 0',
                      borderRadius: 6,
                      boxShadow: '0 6px 16px rgba(0,0,0,0.16)',
                      listStyle: 'none',
                      minWidth: 120,
                      display: showServices ? 'block' : 'none',
                      zIndex: 20,
                    }}
                  >
                    <li style={{ padding: '6px 14px' }}>
                      <Link
                        to="/profile"
                        style={{ color: '#f9fafb', textDecoration: 'none', fontSize: '13px' }}
                      >
                        Profile
                      </Link>
                    </li>
                    <li style={{ padding: '6px 14px' }}>
                      <Link
                        to="/data"
                        style={{ color: '#f9fafb', textDecoration: 'none', fontSize: '13px' }}
                      >
                        Data
                      </Link>
                    </li>
                    <li style={{ padding: '6px 14px' }}>
                      <Link
                        to="/order"
                        style={{ color: '#f9fafb', textDecoration: 'none', fontSize: '13px' }}
                      >
                        Order Page
                      </Link>
                    </li>
                    <li style={{ padding: '6px 14px' }}>
                      <Link
                        to="/cart"
                        style={{ color: '#f9fafb', textDecoration: 'none', fontSize: '13px' }}
                      >
                        Cart Page
                      </Link>
                    </li>
                    <li style={{ padding: '6px 14px' }}>
                      <Link
                        to="/shopping"
                        style={{ color: '#f9fafb', textDecoration: 'none', fontSize: '13px' }}
                      >
                        Shopping 
                      </Link>
                      </li>
                    <li style={{ padding: '6px 14px' }}>
                      <Link
                        to="/grpcCall"
                        style={{ color: '#f9fafb', textDecoration: 'none', fontSize: '13px' }}
                      >
                        GRPC 
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to={item.href}
                  style={{
                    color: '#f9fafb',
                    textDecoration: 'none',
                    fontSize: '13px',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '50px' }}>
          <span
            style={{ fontWeight: 600, fontSize: '13px' }}
          >{`Welcome, ${profile?.clientId || 'User'}`}</span>
          <Link
            to="/Logout"
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.08)',
              color: '#f9fafb',
              padding: '7px 10px',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 7l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 12H9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Logout
          </Link>
        </div>
      </nav>
      <hr style={{ border: '1px solid #e5e7eb', margin: '0 14px 24px 14px' }} />
    </>
  );
}

export default MenuBar;
