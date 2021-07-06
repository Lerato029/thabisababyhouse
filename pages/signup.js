import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import valid from "../utils/valid";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";

const SignUp = () => {
  const initialState = { name: "", email: "", password: "", c_password: "" };
  const [userData, setUserData] = useState(initialState);

  //destructuring userData object properties
  const { name, email, password, c_password } = userData;

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
    const errMessage = valid(name, email, password, c_password);
    if (errMessage)
      return dispatch({ type: "NOTIFY", payload: { error: errMessage } });
    dispatch({
      type: "NOTIFY",
      payload: { loading: true },
    });
    const res = await postData("auth/signup", userData);
    console.log(res)
    if (res.err) {
      return dispatch({ type: "NOTIFY", payload: { error: res.error } });
    } else {
      router.back();
      return dispatch({ type: "NOTIFY", payload: { success: res.message } });
    }
  };

  
  return (
    <div className="container">
      <Head>
        <title>Sign Up</title>
      </Head>

      <form
        className="mx-auto my-4"
        style={{ maxWidth: "450px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">Enter Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="username"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
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
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Password"
            name="c_password"
            value={c_password}
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Sign Up
        </button>
        <p className="my-2">
          Do you have an account?{" "}
          <Link href="/signin">
            <a style={{ color: "#b82ec1"}}>Login</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
