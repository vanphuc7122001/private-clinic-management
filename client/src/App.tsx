import { useEffect, useContext } from 'react'
import useRouteElements from './hooks/useRouteElements'
// import { Datepicker, Input, initTE } from 'tw-elements'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './components/ErrorBoundary'
import { useNavigate } from 'react-router-dom'

function App() {
  const { reset, isAuthenticated } = useContext(AppContext)

  const navigate = useNavigate()
  useEffect(() => {
    // initTE({ Datepicker, Input })
  }, [isAuthenticated, navigate])
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  const element = useRouteElements()
  return (
    <div className='App'>
      <ErrorBoundary>
        {element}
        <ToastContainer />
      </ErrorBoundary>
    </div>
  )
}

export default App
