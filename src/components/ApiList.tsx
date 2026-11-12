import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

function ApiList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let mounted = true;

    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (mounted) {
          setUsers(response.data);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err?.message || 'Unable to load users from the API.');
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const haystack = `${user.name} ${user.email} ${user.company.name}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [search, users]);

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 45%, #38bdf8 100%)',
          borderRadius: '20px',
          padding: '24px',
          color: '#f8fafc',
          boxShadow: '0 14px 40px rgba(15, 23, 42, 0.16)',
        }}
      >
        <h1 style={{ margin: '0 0 8px', fontSize: '28px' }}>React API list</h1>
        <p style={{ margin: 0, opacity: 0.95 }}>
          This page fetches a list from a public API and displays it with search support.
        </p>
      </div>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '18px',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        }}
      >
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email, or company"
          style={{
            width: '100%',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '10px 12px',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {loading && <p style={{ margin: 0, color: '#475569' }}>Loading users...</p>}

      {error && <p style={{ margin: 0, color: '#dc2626' }}>Error: {error}</p>}

      {!loading && !error && (
        <div style={{ display: 'grid', gap: '12px' }}>
          {filteredUsers.length === 0 ? (
            <p style={{ margin: 0, color: '#64748b' }}>No users match your search.</p>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px',
                  background: '#f8fafc',
                }}
              >
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  {user.name}
                </div>
                <div style={{ color: '#475569', fontSize: '14px', marginBottom: '4px' }}>
                  {user.email}
                </div>
                <div style={{ color: '#64748b', fontSize: '13px' }}>
                  {user.company.name}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ApiList;
