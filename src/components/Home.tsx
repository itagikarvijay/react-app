import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          to="/login"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #dbeafe',
            background: '#ffffff',
            color: '#2563eb',
            padding: '8px 12px',
            borderRadius: '999px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 700,
            boxShadow: '0 6px 16px rgba(37, 99, 235, 0.12)',
            textDecoration: 'none',
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
              d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 7l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 12H3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Login with OAuth2
        </Link>
      </div>
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 45%, #38bdf8 100%)',
          borderRadius: '20px',
          color: '#f8fafc',
          padding: '28px',
          boxShadow: '0 14px 40px rgba(15, 23, 42, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ maxWidth: '560px' }}>
          <p
            style={{
              margin: '0 0 8px',
              textTransform: 'uppercase',
              letterSpacing: '0.24em',
              fontSize: '12px',
              opacity: 0.9,
            }}
          >
            Weather-themed home
          </p>
          <h1 style={{ margin: '0 0 10px', fontSize: '32px', lineHeight: 1.2 }}>
            Welcome to your calm weather dashboard
          </h1>
          <p style={{ margin: '0 0 16px', fontSize: '15px', lineHeight: 1.6, opacity: 0.95 }}>
            Enjoy a fresh landing experience with a bright, airy atmosphere and quick access to your
            profile and forecasts.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              to="/profile"
              style={{
                background: '#f8fafc',
                color: '#0f172a',
                padding: '10px 14px',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              View Profile
            </Link>
            <Link
              to="/order"
              style={{
                border: '1px solid rgba(255,255,255,0.35)',
                color: '#f8fafc',
                padding: '10px 14px',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              Open Order Page
            </Link>
          </div>
        </div>

        <div
          style={{
            minWidth: '220px',
            background: 'rgba(255,255,255,0.16)',
            backdropFilter: 'blur(10px)',
            borderRadius: '18px',
            padding: '18px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '54px', marginBottom: '6px' }}>☀️</div>
          <div style={{ fontSize: '34px', fontWeight: 800 }}>24°C</div>
          <div style={{ marginTop: '6px', fontSize: '14px', opacity: 0.95 }}>
            Clear skies • Light breeze
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { title: 'Humidity', value: '68%' },
          { title: 'Wind', value: '12 km/h' },
          { title: 'UV Index', value: 'Low' },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '16px',
              boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)',
            }}
          >
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
