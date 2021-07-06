import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect} from "react";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

const SignIn = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);

  //destructuring userData object properties
  const { email, password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({
      type: "NOTIFY",
      payload: { loading: true },
    });
    const res = await postData("auth/login", userData);

    if (res.err) {
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      dispatch({ type: "NOTIFY", payload: { success: res.message } });

      dispatch({
        type: "AUTH",
        payload: { token: res.access_token, user: res.user },
      });
      Cookie.set("refreshtoken", res.refresh_token, {
        path: "api/auth/accessToken",
        expires: 7,
      });
      localStorage.setItem("firstLogin", true);
    }
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.back();
  }, [auth]);
  return (
    <div className="container-fluid ">
      <Head>
        <title>Sign In</title>
      </Head>

      <form
        className="mx-auto my-5 bg-light px-4 py-2"
        style={{ maxWidth: "450px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group my-5">
          <label htmlFor="log-in-email">Email address</label>
          <input
            type="email"
            className="form-control my-2 "
            id="log-in-email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control my-2 "
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Login                                    
        </button>
        <p className="my-2">
          Don't have an account?{" "}
          <Link href="/signup">
            <a style={{ color: "#b82ec1" }}>Signup</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
