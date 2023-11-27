import './reset.scss'
import './style.scss'
import HeaderHome from '~/components/Header/HeaderHome'
import FooterHome from '~/components/Footer/FooterHome/FooterHome'
import { Outlet } from 'react-router-dom'

export default function CustomerLayOut() {
  return (
    <>
      <body id='home'>
        <div>
          <HeaderHome />
          {/* Hero */}

          <Outlet />
          <FooterHome />
        </div>
      </body>
    </>
  )
}
