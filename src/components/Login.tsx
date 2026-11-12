import { useState } from 'react';

interface UserData {
  name?: string;
  login?: string;
  email?: string;
  [key: string]: unknown;
}

function Login() {
  const [user] = useState<UserData | null>(null);
  const [loading] = useState(false);
  // useEffect(() => {
  //   fetch('/api/user', {
  //       headers: {
  //           'Authorization': `Bearer ${accessToken}`,
  //           'Content-Type': 'application/json',
  //       },
  //     credentials: 'include',
  //   })
  //     .then((res) => {
  //       if (res.ok) return res.json();
  //       throw new Error('Not authenticated');
  //     })
  //     .then((data) => {
  //       setUser(data as UserData);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setUser(null);
  //       setLoading(false);
  //     });
  // }, []);

  const handleLogin = () => {
    // window.location.href = 'http://localhost:8181/oauth2/authorization/my-provider';

    const authUrl = new URL('http://localhost:9000/oauth2/authorize');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', 'frontend-app');
    authUrl.searchParams.append('client_secret', 'super-secure-secret');
    authUrl.searchParams.append('scope', 'openid profile email offline_access');
    authUrl.searchParams.append('redirect_uri', 'http://localhost:5173/callback');
    authUrl.searchParams.append('state', crypto.randomUUID()); // random string
    authUrl.searchParams.append('nonce', crypto.randomUUID()); // random string

    window.location.href = authUrl.toString(); // redirect browser
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center' }}>
        <h3>OAuth2 Authorization.</h3>

        {!user ? (
          <div>
            <p>You are not logged in.</p>
            <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Log in with OAuth Provider
            </button>
          </div>
        ) : (
          <div>
            <h2>Welcome, {user.name || user.login}!</h2>
            <p>Email: {user.email}</p>
            <div
              style={{
                textAlign: 'left',
                display: 'inline-block',
                background: '#f0f0f0',
                padding: '15px',
              }}
            >
              <h3>Raw User Data from Provider:</h3>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
