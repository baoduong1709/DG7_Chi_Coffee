import './App.css';
import bootstrap from 'bootstrap';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeLogin from './components/pages/employee/login';

function App() {
  return (
    <div class="min-h-full h-screen w-screen flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path='/admin/login' element={<EmployeeLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
