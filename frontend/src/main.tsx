import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from './components/Home.tsx';
import Layout from './Layout.tsx';
import Details2 from './components/Details2.tsx';
import Details1 from './components/Details1.tsx';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='details_1' element={<Details1/>}></Route>
      <Route path='details_2' element={<Details2/>}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
