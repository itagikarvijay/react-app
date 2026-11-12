import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { fetchUserProfile } from '../thunks/ProfileThunk';
import { login } from '../feature/auth/userSlice';

function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      console.error('OAuth callback missing authorization code');
      return;
    }

    const exchangeToken = async () => {
      axios.interceptors.response.use((response) => {
        console.log('Response:', response);
        return response ;
      });
      try {
        const response = await axios.post(
          '/oauth2/token',
          new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'http://localhost:5173/callback',
            client_id: 'frontend-app',
            client_secret: 'super-secure-secret',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic ' + btoa('frontend-app:super-secure-secret'),
            },
          },
        );
        console.log('Response:', response);
        if (response.status === 200) {
          console.log('Token exchange successful:', response.data);
          const { access_token, refresh_token } = response.data;

          // localStorage.setItem('access_token', access_token);
          // localStorage.setItem('refresh_token', refresh_token);

          if (access_token.trim()) {
            dispatch(fetchUserProfile(access_token)); // Fetch user profile with the access token
            dispatch(login()); // Update the login state in Redux
          }

          navigate('/Menubar'); // Redirect to the WeatherChart page after successful token exchange
        } else {
          console.error('Token exchange failed:', response.data);
        }
      } catch (error) {
        console.log('Token exchange failed:', error);
      }
    };

    exchangeToken();
  }, [searchParams, navigate]);

  return <div>Processing login...</div>;
}

export default OAuthCallback;
