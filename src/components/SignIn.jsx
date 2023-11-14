import { Link } from "react-router-dom";
import { handleNavClick } from "../utils/eventHandlers";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const nav = useSelector((state) => state.nav);
  const dispatch = useDispatch();

  const [link] = nav.filter((navLink) => navLink.path == "/signup");
  const isSelected = link.selected ? "text-main-orange " : "";
  const isHidden = !link.active ? "hidden " : "";
  const navLinkStyles = `${isSelected}${isHidden}`;

  const navigate = useNavigate();

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
    <div class="flex justify-center h-screen w-screen items-center flex-col">
      <div className="text-grey-darker text-md font-bold mb-2 underline">
        Log In
      </div>
      <div class="w-full md:w-1/2 flex flex-col items-center ">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="Email"
          >
            Email
          </label>
          <input
            class="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="Email"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="mb-3">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
      </div>
      <div class="flex items-center justify-between flex-col">
        <button
          class="bg-main-orange w-full my-2 rounded"
          type="button"
          onClick={handleLogin}
        >
          Log In
        </button>
        <a
          class=" font-bold text-sm"
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
