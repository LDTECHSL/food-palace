import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminNavbar from './layouts/AdminNavbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Breakfast from './pages/Breakfast';
import Lunch from './pages/Lunch';
import Dinner from './pages/Dinner';
import Bakery from './pages/Bakery';
import Drinks from './pages/Drinks';
import Deserts from './pages/Deserts';
import Orders from './pages/Orders';

function App() {

  const location = useLocation()

  const isLogin = location.pathname === "/admin/login"
  const isAdmin = location.pathname.split("/")[1].split("/")[0] === "admin"

  return (
    <>
      <Toast />
      {isLogin ? (
        <Routes>
          <Route path='/admin/login' element={<Login />} />
        </Routes>
      ) : isAdmin ? (
        <AdminNavbar>
          <Routes>
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </Routes>
        </AdminNavbar>
      ) : (
        <Navbar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/breakfast' element={<Breakfast/>}/>
            <Route path='/lunch' element={<Lunch/>}/>
            <Route path='/dinner' element={<Dinner/>}/>
            <Route path='/bakery' element={<Bakery/>}/>
            <Route path='/drinks' element={<Drinks/>}/>
            <Route path='/deserts' element={<Deserts/>}/>
            <Route path='/orders' element={<Orders/>}/>
          </Routes>
        </Navbar>
      )}
    </>
  );
}

export default App;
