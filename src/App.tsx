import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import OAuthCallback from './dashboard/OAuthCallback';
import MenuBar from './components/MenuBar';
import Data from './components/Data';
import Profile from './components/Profile';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import LogoutCard from './components/LogoutCard';
import WeatherChart from './components/WeatherChart';
import OrderPage from './components/OrderPage';
import CartPage from './components/CartPage';
import ShoppingPage from './components/ShoppingPage';
import OrderViewer from './components/OrderViewer';

function App() {
  const userState = useSelector((state: RootState) => state.auth);

  return (
    <div>
      {userState.login && <MenuBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<OAuthCallback />} />
        <Route path="/Weather" element={<WeatherChart />} />
        <Route path="/logout" element={<LogoutCard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/data" element={<Data />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/grpcCall" element={<OrderViewer />} />
        {/* <Route path="/Menubar" element={<MenuBar />} /> */}
      </Routes>
    </div>
  );
}

export default App;
