import { useNavigate } from 'react-router-dom'

export const useNavigateClick = (pathName) => {
  const navigate = useNavigate()
  return () => navigate(pathName)
}
