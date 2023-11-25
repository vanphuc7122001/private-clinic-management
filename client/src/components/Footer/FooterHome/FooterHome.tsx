import Logo from '~/components/Logo/Logo'

export default function FooterHome() {
  return (
    <footer className='footer'>
      <div className='container-app'>
        <div className='footer__row'>
          <section className='footer__column'>
            {/* Logo */}
            <Logo />
            <p className='footer__desc'>Chăm sóc đặc biệt mọi độ tuổi . Nụ cười của bạn là niềm vui của chúng tôi.</p>
          </section>
          <section className='footer__column'>
            <h3 className='footer__heading'>Support</h3>
            <ul className='footer__list mt-5'>
              <li className='footer__item'>Help center</li>
              <li className='footer__item'>Account information</li>
              <li className='footer__item'>About</li>
              <li className='footer__item'>Contact us</li>
            </ul>
            <h3 className='footer__heading mt-7'>Support</h3>
            <ul className='footer__list mt-5'>
              <li className='footer__item'>Help center</li>
              <li className='footer__item'>Account information</li>
            </ul>
          </section>
          <section className='footer__column'>
            <h3 className='footer__heading'>Support</h3>
            <ul className='footer__list mt-5'>
              <li className='footer__item'>Help center</li>
              <li className='footer__item'>Account information</li>
            </ul>
            <h3 className='footer__heading mt-7'>Support</h3>
            <ul className='footer__list mt-5'>
              <li className='footer__item'>Help center</li>
            </ul>
          </section>
          <section className='footer__column'>
            <h3 className='footer__heading'>Stay In Touch</h3>
            <ul className='footer__social mt-5'>
              <li className='footer__link'>
                <i className='footer__link--facebook fab fa-facebook-f' />
              </li>
              <li className='footer__link'>
                <i className='footer__link--twitter fab fa-twitter' />
              </li>
              <li className='footer__link'>
                <i className='footer__link--linkedin fab fa-linkedin-in' />
              </li>
            </ul>
            <h3 className='footer__heading mt-7'>Subscribe</h3>
            <p className='footer__desc footer__desc--small mt-5'>
              Subscribe our newsletter for the latest update of Dental care
            </p>
            <form action='#!' className='footer__form'>
              <input className='footer__form-email' type='email' placeholder='Email your enter...' />
              <button className='footer__form-btn'>Subscribe</button>
            </form>
          </section>
        </div>
        <div className='footer__line' />
        <div className='footer__copyright'>2023 Copyright by dangvanphuc from figma.</div>
      </div>
    </footer>
  )
}
