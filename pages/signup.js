/* =========================================Sign Up Page================================================= */
//next elements
import Head from "next/head";

//routing
import Link from "next/link";
import { useRouter } from "next/router";

//importing react hooks
import { useState, useContext } from "react";

//validation module
import valid from "../utils/valid";

//context provided for website
import { DataContext } from "../store/GlobalState";

//POST request module
import { postData } from "../utils/fetchData";


const SignUp = () => {
  //sign up data object as userData default values
  const initialState = { name: "", email: "", password: "", c_password: "" };
  const [userData, setUserData] = useState(initialState);

  //destructuring userData object properties
  const { name, email, password, c_password } = userData;

  //getting dispatch from global state
  const { dispatch } = useContext(DataContext);


  //initializing router
  const router = useRouter();

  /* --------------------------------------------------------------------Main Functionality */
  //storing data from user
  const handleChangeInput = (e) => {
    //destructuring input data
    const { name, value } = e.target;
    //update state property
    setUserData({ ...userData, [name]: value });
  };

  /* ===================================================================CREATE */
  const handleSubmit = async (e) => {
    //prevent page refresh on submit
    e.preventDefault();

    //call module and see if error is returned
    const errMessage = valid(name, email, password, c_password);
    if (errMessage)
      return dispatch({ type: "NOTIFY", payload: { error: errMessage } });

    //error not returned so display loading component
    dispatch({
      type: "NOTIFY",
      payload: { loading: true },
    });

    //make post request to server to signup passing userData as payload
    const res = await postData("auth/signup", userData);
    
    //check if error
    if (res.err) {
      return dispatch({ type: "NOTIFY", payload: { error: res.error } });
    } else {
      //direct user back and notify success in signing up!
      router.back();
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    }
  };

  /* JSX with */
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
