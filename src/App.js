import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmpList from './EmpList';
import EmpLogin from './EmpLogin';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';
import EmpCreate from './EmpCreate';
import EmpEdit from './EmpEdit';


function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
        <Appheader></Appheader>
        <Routes>
          <Route path='/emplist' element={<EmpList />}></Route>
          <Route path='/' element={<EmpLogin />}></Route>
          <Route path='/empcreate' element={<EmpCreate />}></Route>
          <Route path='/empedit/:empid' element={<EmpEdit />}></Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
