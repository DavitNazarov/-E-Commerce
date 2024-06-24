import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredientails } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { ScaleLoader } from "react-spinners";
import gradient2 from "../../../public/gradient2.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isloading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth); // get user info

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredientails({ ...res }));
        navigate(redirect);
        toast.success("Successfully registered");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };

  return (
    <section className="pl-[10rem] flex ">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form className="consteiner w-[30rem]" onSubmit={submitHandler}>
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name:
            </label>
            <input
              type="text"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              confirm password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Pleace confirm Password"
              value={confirmPass}
              onChange={(e) => setconfirmPass(e.target.value)}
            />
          </div>
          <button
            disabled={isloading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isloading ? "Please wait..." : "Register"}
          </button>
          {isloading && <ScaleLoader />}
        </form>
        <div className="mt-4">
          <p className="text-white">
            Have an account? {""}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-600 hover-underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="h-[100%] w-[100%]">
        <img
          src={gradient2}
          alt="image"
          className="h-[43rem]  xl:block md:hidden sm:hidden rounded-lg  "
        />
      </div>
    </section>
  );
};
export default Register;
