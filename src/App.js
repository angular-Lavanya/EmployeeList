import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';
import EmployeeCreate from './EmployeeCreate';


function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
        <Appheader></Appheader>
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/employeecreate' element={<EmployeeCreate />}></Route>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;