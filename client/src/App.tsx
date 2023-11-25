import { useEffect } from 'react'
import useRouteElements from './hooks/useRouteElements'
import { initTE, Input, Ripple } from 'tw-elements'

function App() {
  useEffect(() => {
    initTE({ Input, Ripple })
  }, [])
  const element = useRouteElements()
  return <div className='App'>{element}</div>
}

export default App
