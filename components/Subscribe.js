/* ==================================================The Subscribe Component================================== */
/* importing react and react hooks */
import React, { useRef, useState } from "react";
//using the postData module to make post req
import { postData } from "../utils/fetchData";


const Subscribe = () => {
  //using hook to get email input value quicker
  const email = useRef(null);
  
  //message to be displayed to user
  const [message, setMessage] = useState("");

  /* ==========================================================Main Functionality */
  //===========================================================Create Subscription
  const subscribe = async (e) => {
    e.preventDefault();

    /* POST request to api with body object */
    const res = await postData("subscribe", { email: email.current.value });

    //check if an error is returned
    if (res.err) {
      //message to be read to user
      setMessage(err);
      return;
    }

    //else we success and reset email value
    email.current.value = "";
    //success msg to client
    setMessage(res.msg);
  };

  /* JSX Featuring a form to subscribe to mailing list*/
  return (
    <form onSubmit={subscribe}>
      <h2>Subscribe to our newsletter</h2>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          required
          ref={email}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div>{message ? message : `Get updated on the baby house`}</div>

      <button type="submit" className="btn btn-success">
        Subscribe
      </button>
    </form>
  );
};

export default Subscribe;
