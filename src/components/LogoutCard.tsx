import { Link } from 'react-router-dom';

function LogoutCard() {
  return (
    <div style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #38bdf8 100%)',
          borderRadius: '24px',
          color: '#f8fafc',
          padding: '28px',
          boxShadow: '0 16px 45px rgba(15, 23, 42, 0.22)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p
              style={{
                margin: '0 0 6px',
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                fontSize: '12px',
                opacity: 0.9,
              }}
            >
              Session overview
            </p>
            <h2 style={{ margin: '0 0 8px', fontSize: '28px' }}>You are about to sign out</h2>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, opacity: 0.95 }}>
              Weather updates and profile details will stay secure until you sign back in.
            </p>
          </div>
          <div style={{ fontSize: '46px' }}>🌦️</div>
        </div>

        <div
          style={{
            marginTop: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
          }}
        >
          {[
            { label: 'Status', value: 'Logged out' },
            { label: 'Weather', value: 'Clear skies' },
            { label: 'Next update', value: '10 min' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: 'rgba(255,255,255,0.16)',
                borderRadius: '14px',
                padding: '12px',
              }}
            >
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{item.label}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '4px' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '22px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              background: '#ffffff',
              color: '#1d4ed8',
              textDecoration: 'none',
              padding: '10px 14px',
              borderRadius: '999px',
              fontWeight: 700,
            }}
          >
            Stay signed in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogoutCard;
