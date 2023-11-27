import './styles.css'

export default function Logo() {
  return (
    <a href='#!'>
      <div className='logo'>
        <span className='logo__circle' />
        <div className='logo__text'>
          <span className='logo__brand'> shine </span>
          <span className='logo__brand logo__brand--small'>smile</span>
        </div>
      </div>
    </a>
  )
}
