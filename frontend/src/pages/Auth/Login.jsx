import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredientails } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { ScaleLoader } from "react-spinners";
import gradient1 from "/gradient1.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

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

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredientails({ ...res }));
    } catch (err) {
      toast.error(err?.data?.massage || err.message);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex  ">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4"> Sign In </h1>

          <form
            onSubmit={submitHandler}
            action=""
            className="conteiner w-[30rem]"
          >
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <ScaleLoader color="#ffffff" />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer ? {""}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="h-[100%] w-[100%]">
          <img
            src={gradient1}
            alt="image"
            className="h-[43rem]  xl:block md:hidden sm:hidden rounded-lg  "
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
