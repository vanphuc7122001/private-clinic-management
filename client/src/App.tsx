import useRouteElements from './hooks/useRouteElements'

function App() {
  const element = useRouteElements()
  return <div className='App'>{element}</div>
}

export default App
