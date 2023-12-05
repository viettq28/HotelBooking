import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './pages/Root';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import Detail from './pages/detail/Detail';
import Search from './pages/search/Search';
import Transaction from './pages/transaction/Transaction';
import Dashboard from './pages/dashboard/Dashboard';
import LoginOnly from './utils/LoginOnly';
import PreventAuth from './utils/PreventAuth';
import LoginUserContextProvider from './context/LoginUserContextProvider';
import DataBankContextProvider from './context/DataBankContextProvider'; 

import './App.css';
// Dùng React Router để định tuyến, Root page chứa Navbar và Footer là các components cố định, thay đổi path chỉ render các thành phần con thông qua Outlet của React Router Dom
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { element: <PreventAuth />, children: [{ path: 'auth/:auth', element: <Auth /> }]},
      { path: 'search', element: <Search /> },
      { path: 'detail/:id', element: <Detail /> },
      {
        element: <LoginOnly />,
        children: [{ path: 'transaction', element: <Transaction /> }],
      },
    ],
  },
  {
    element: <LoginOnly forAdmin={true} />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'dashboard/:section', element: <Dashboard /> },
    ],
  },
]);

function App() {
  return (
    <DataBankContextProvider>
      <LoginUserContextProvider>
        <RouterProvider router={router} />
      </LoginUserContextProvider>
    </DataBankContextProvider>
  );
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Home/>}/>
  //       <Route path="/search" element={<Search/>}/>
  //       <Route path="/detail" element={<Detail/>}/>
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;
