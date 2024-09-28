
import './App.css'
import Home from './Components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductTab from './Components/ProductTab'
import { Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Create from './Components/Create'
import Show from './Components/Show'
import Protect from './Components/Protect'
import Delete from './Components/Delete'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/*' element={<ProductTab/>}/>
        <Route path='/user/signup' element={<Signup/>}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/products/create' element={<Create/>}/>
        <Route path="products/:id" element={<Show/>}/>
        <Route path="/protect" element={<Protect/>}/>
        <Route path="/delete/:id" element={<Delete/>}/>
      </Routes>
    </>
  )
}

export default App
