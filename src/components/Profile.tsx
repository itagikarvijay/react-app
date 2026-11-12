import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

export default function Profile() {
  const profile = useSelector((state: RootState) => state.auth.data);

  // const [externalProfile, setExternalProfile] = useState<any>(null);
  // const [loadingExternal, setLoadingExternal] = useState(false);
  // const [externalError, setExternalError] = useState<string | null>(null);

  // useEffect(() => {
  //     const fetchProfile = async () => {
  //         setLoadingExternal(true);
  //         setExternalError(null);
  //         try {
  //             const res = await axios.get('/api/profile', {
  //                 headers: {
  //                     Authorization: `Bearer ${localStorage.getItem('access_token')}`
  //                 }
  //             });
  //             if (res.status === 200) {
  //                 dispatch(fetchUserProfile(res.data.access_token)); // Fetch user profile with the access token
  //             }
  //             setExternalProfile(res.data);
  //         } catch (err: any) {
  //             setExternalError(err?.message || 'Request failed');
  //         } finally {
  //             setLoadingExternal(false);
  //         }

  //     };

  //     fetchProfile();
  // }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Profile</h2>
      {!profile && <p>No profile data available. Click "Fetch Secured Profile Data" to load.</p>}
      {profile && (
        <pre style={{ background: '#f3f4f6', padding: 12, borderRadius: 6 }}>
          {JSON.stringify(profile, null, 2)}
        </pre>
      )}
    </div>
  );
}
