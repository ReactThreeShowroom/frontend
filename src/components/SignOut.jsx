import { useSignOut } from '../utils/hooks'

const SignOut = () => {
  return <span onClick={useSignOut}>Sign Out</span>
}

export default SignOut
