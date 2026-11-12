import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Data() {
  const [publicData, setPublicData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const token = localStorage.getItem('token');

    axios
      .get('/api/common', {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      })
      .then((res) => {
        if (mounted) setPublicData(res.data);
      })
      .catch((err) => {
        if (mounted) setError(err?.message || 'Error fetching public data');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Profile</h2>
      {!publicData && <p>No profile data available. Click "Fetch Secured Profile Data" to load.</p>}

      <hr style={{ margin: '16px 0' }} />

      <h3>Public endpoint</h3>
      {loading && <p>Loading public data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {publicData && (
        <pre style={{ background: '#f3f4f6', padding: 12, borderRadius: 6 }}>
          {JSON.stringify(publicData, null, 2)}
        </pre>
      )}
    </div>
  );
}
