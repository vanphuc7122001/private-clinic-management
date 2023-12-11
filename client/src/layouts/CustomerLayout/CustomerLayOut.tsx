// import './reset.scss'
import './style.scss'
import HeaderHome from '~/components/Header/HeaderHome'
import FooterHome from '~/components/Footer/FooterHome/FooterHome'

export default function CustomerLayOut({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div id='home'>
        <div>
          <HeaderHome />
          {children}
          <FooterHome />
        </div>
      </div>
    </>
  )
}
