import { useNavigate } from 'react-router-dom'

export const useNavigateClick = () => {
  const navigate = useNavigate()
  return () => navigate(pathName)
}
