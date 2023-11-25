import './reset.scss'
import './style.scss'
import { hero1, hero2 } from '~/utils/export'
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
          <div className='hero-header'>
            <div className='container-app'>
              <section className='hero'>
                <section className='hero__content'>
                  <h1 className='hero__heading'>Chăm sóc y tế tại phòng khám của chúng tôi.</h1>
                  <p className='hero__desc desc'>
                    Chăm sóc đặc biệt mọi độ tuổi . Nụ cười của bạn là niềm vui của chúng tôi
                  </p>
                  <div className='hero__row'>
                    <a href='#!' className='btn'>
                      Đặt lịch
                    </a>
                    <span className='hero__phone'> Hoặc gọi (+84) 4567890 </span>
                  </div>
                </section>
                <div className='hero__media'>
                  <figure className='hero_images'>
                    <img src={hero1} alt='hero' className='hero_img' />
                    <img src={hero2} alt='hero' className='hero_img' />
                  </figure>
                </div>
              </section>
            </div>
          </div>
          <Outlet />
          <FooterHome />
        </div>
      </body>
    </>
  )
}
