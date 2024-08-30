import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  return (
    <>
    {location.pathname === "/"?  <Header/>:null}
    <Outlet/>
    {location.pathname === "/"?  <Footer/>:null}
    </>
  )
}

export default Layout