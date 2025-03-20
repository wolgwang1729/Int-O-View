import Header2 from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  return (
    <>
    {location.pathname === "/"?  <Header2/>:null}
    <Outlet/>
    {location.pathname === "/"?  <Footer/>:null}
    </>
  )
}

export default Layout