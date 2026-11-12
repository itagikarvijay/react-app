// import { useState, type FormEvent } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setToken, logout, fetchProfile } from './feature/auth/authSlice';
// import type { AppDispatch, RootState } from './app/store';

// function App() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { token, profileData, loading, error } = useSelector((state: RootState) => state.auth);
//   const [inputToken, setInputToken] = useState('');

//   const handleMockLogin = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (inputToken.trim()) {
//       dispatch(setToken(inputToken));
//       setInputToken('');
//     }
//   };

//   return (
//     <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
//       <h2>React + Redux OAuth2 Client</h2>
//       <hr />

//       {/* Auth Status & Token Input */}
//       {!token ? (
//         <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '5px' }}>
//           <h4>🔑 Authenticate with Token</h4>
//           <p style={{ fontSize: '0.9rem', color: '#555' }}>
//             Generate a token from your Spring Boot Auth server via cURL, paste it below to simulate logging in:
//           </p>
//           <form onSubmit={handleMockLogin}>
//             <input
//               type="text"
//               placeholder="Paste Bearer Token here..."
//               value={inputToken}
//               onChange={(e) => setInputToken(e.target.value)}
//               style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//             />
//             <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>
//               Save Token to State
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div style={{ background: '#e8f5e9', padding: '1rem', borderRadius: '5px' }}>
//           <p>✅ <strong>Status:</strong> Logged In (Token stored in Redux & LocalStorage)</p>
//           <button onClick={() => dispatch(logout())} style={{ marginRight: '10px', padding: '6px 12px' }}>
//             Logout
//           </button>
//           <button
//             onClick={() => dispatch(fetchProfile())}
//             disabled={loading}
//             style={{ padding: '6px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
//           >
//             {loading ? 'Fetching...' : 'Fetch Secured Profile Data'}
//           </button>
//         </div>
//       )}

//       {/* API Errors */}
//       {error && (
//         <div style={{ color: 'red', marginTop: '1rem', background: '#ffebee', padding: '1rem', borderRadius: '5px' }}>
//           <strong>Error:</strong> {JSON.stringify(error)}
//         </div>
//       )}

//       {/* Secure Data Display */}
//       {profileData && (
//         <div style={{ marginTop: '1.5rem', background: '#fffde7', padding: '1rem', borderRadius: '5px', border: '1px solid #fff59d' }}>
//           <h3>📂 Protected Data From Resource Server:</h3>
//           <pre style={{ background: '#272822', color: '#f8f8f2', padding: '1rem', borderRadius: '5px', overflowX: 'auto' }}>
//             {JSON.stringify(profileData, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
