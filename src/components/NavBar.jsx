import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNav } from "../utils/maps";
import { handleNavClick, handleSignOut } from "../utils/eventHandlers";
import { useDispatch } from "react-redux";
const NavBar = () => {

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const client = useSelector((state) => state.client);
  const nav = useSelector((state) => state.nav);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const linksMap = getNav(nav, handleNavClick, dispatch);

  return (
    <header id="headContainer" className="flex-col">
      <nav id="navContainer" className="flex justify-around">
        <h1 id="webName" className="font-sans font-semibold text-lg">
          Customize Your Coatings
        </h1>
        {linksMap}
        {auth.token && (
          <span
            onClick={() => handleSignOut(dispatch, navigate)}
            className={'hover:bg-main-orange hover:text-[#ffffff]'}>
            Sign Out
          </span>
        )}
      </nav>
      {auth.token && (
        <div id="infoContainer">
          <span id="currentUser">Welcome back {user.name}!</span>
          {client.id && <span id="currentClient">&nbsp;Currently working with: {client.name}</span>}
        </div>
      )}
    </header>
  )
}

export default NavBar;
