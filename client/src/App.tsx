import { useEffect, useContext, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './components/ErrorBoundary'
import { publicRoutes } from './routes'
import CustomerLayOut from './layouts/CustomerLayout'

function App() {
  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <Router>
      <div className='App'>
        <ErrorBoundary>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component
              let Layout: any = CustomerLayOut
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Routes>
          <ToastContainer />
        </ErrorBoundary>
      </div>
    </Router>
  )
}

export default App
