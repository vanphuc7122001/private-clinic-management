import { useNavigate } from 'react-router-dom'

export default function useNavigation() {
  const navigate = useNavigate()

  return navigate
}
