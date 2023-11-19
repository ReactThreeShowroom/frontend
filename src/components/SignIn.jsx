import { Link } from "react-router-dom";
import { handleNavClick } from "../utils/eventHandlers";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const nav = useSelector((state) => state.nav);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [link] = nav.filter((navLink) => navLink.path == "/signup");
  const isSelected = link.selected ? "text-main-orange " : "";
  const isHidden = !link.active ? "hidden " : "";
  const navLinkStyles = `${isSelected}${isHidden} hover:bg-main-orange hover:text-[#ffffff]`

  const handleLogin = () => {
    console.log("loggin in...");
  };

  return (
    // <>
    //   <Link
    //     to={link.path}
    //     id={`page${link.value}`}
    //     className={navLinkStyles}
    //     onClick={() => handleNavClick(dispatch, link)}>
    //     Sign Up
    //   </Link>
    // </>
    <div className="flex justify-center h-screen w-screen items-center flex-col">
      <div className="text-grey-darker text-md font-bold mb-2 underline">
        Log In
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="Email"
            name="Email"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
          />
        </div>
      </div>
      <div className="flex items-center justify-between flex-col">
        <button
          className="bg-main-orange w-full my-2 rounded"
          type="button"
          onClick={handleLogin}
        >
          Log In
        </button>
        <a
          className=" font-bold text-sm"
          href="#"
          onClick={() => navigate(`/passwordReset/`)}
        >
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

export default SignIn;
