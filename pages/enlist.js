/* =====================================The Enlist Page - Where Applications Can Be Made ======================== */
/* ================Import Statements=============== */
//react hooks
import { useState, useContext } from "react";

//postData module for creating new application
import { postData } from "../utils/fetchData";

//getting my data provider
import { DataContext } from "../store/GlobalState";

//next imports
import Head from "next/head";
import Link from "next/link";



/* ============================================The Enlist Component================================ */
const Enlist = () => {
  //retrieving state and dispatch properties
  const { state, dispatch } = useContext(DataContext);

  //getting auth property from global state object
  const { auth } = state;

  //Variables for submitting form
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");

  //tasks for users to select
  const roles = [
    { task: "gardening" },
    { task: "maintenance" },
    { task: "cleaning" },
    { task: "laundry" },
    { task: "child care" },
    { task: "all" },
  ];
  /* =======================================================================Main Functionality */
  //======================================================CREATE APPLICATION
  const handleSubmit = (e) => {
    e.preventDefault();
    //use email they login with
    const email = auth.user.email;

    //calling postData function to create a new application
    postData("enlist", { fullName, email, mobile, role }, auth.token).then(
      (res) => {
        //check if an error is returned or not
        if (res.err)
          return dispatch({
            type: "NOTIFY",
            payload: { error: res.err },
          });
        return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      }
    );
  };

  /*============== JSX =================*/
  return (
    <div className="container-fluid p-0">
      <Head>
        <title>Enlist</title>
      </Head>
      <div
        className="parent"
        style={{
          padding: "-20%",
          width: "100%",
          height: "100%",

          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundImage: `url(https://cdn2.photostockeditor.com/c/3012/grey-gray-scale-photography-of-girl-walking-towards-destination-black-and-white-black-and-white-image.jpg)`,
        }}
      >
        <div
          className="card-body text-center text-white pt-5"
          style={{ background: "#0000002a", height: "100%" }}
        >
          <h1 className=" display-1 fw-bold my-5 text-capitalize">
            be enlisted
          </h1>
        </div>
      </div>

      <div className="card ">
        <div className="row g-0">
          <div className="col-md-8">
            <img
              src="https://p1.pxfuel.com/preview/146/317/141/curly-hair-child-portrait-girl.jpg"
              className="img-fluid "
              alt="boy with curly hair"
            />
          </div>
          <div className="col-md-4">
            <div className="card-body text-center my-5">
              <h5 className="card-title mt-5">Be enlisted as a volunteer...</h5>
              <p className="card-text">
                There is a never ending list of things to do. You could come and
                spend some time helping around the house. We also need help in
                the care of the babies. If you are interested in volunteering
                short of long term please contact us or sign up below.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section
        className="parent container-fluid bg-secondary"
        style={{
          margin: "0",
          height: "92vh",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "100%",
          backgroundImage: `url(https://p1.pxfuel.com/preview/700/927/770/baby-feet-children-small-tear-black-and-white.jpg)`,
        }}
      >
        <h1 className="text-center text-lg text-dark display-1 fw-bold">
          Bringing Joy
        </h1>
      </section>

      <form className="row mx-5 my-5" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="text-capitalize">volunteer application form</h2>
        {auth.user ? (
          <>
            <div className="col-md-8 text-secondary my-3">
              <h5>Shipping</h5>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="form-control mb-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="test"
                name="email"
                id="email"
                className="form-control mb-2"
                value={auth.user.email}
                disabled={true}
              />
              <label htmlFor="mobile">Mobile</label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                className="form-control mb-2"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4 text-secondary my-3">
              <h5>Role</h5>
              <label htmlFor="validationCustom04">
                Please select an option
              </label>
              <select
                className="form-select text-capitalize"
                id="validationCustom04"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Choose</option>
                {roles.map((option) => (
                  <option
                    className="text-capitalize"
                    key={option.task}
                    value={option.task}
                  >
                    {option.task}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button className="btn btn-success ">Submit</button>
            </div>
          </>
        ) : (
          <Link href="/signin">
            <button className="btn btn-dark my-5">
              <i className="far fa-user" aria-hidden="true"></i> Please Sign In
            </button>
          </Link>
        )}
      </form>

      <style jsx>
        {`
          @media only screen and (max-width: 1024px) {
            /* For tablets: */
            .parent {
              height: 50vh !important;
              background: black;
            }
          }
          @media only screen and (max-width: 768px) {
            /* For mobile phones: */
            .parent {
              height: 50vh !important;
            }
          }
          @media only screen and (max-width: 411px) {
            /* For smaller mobile phones: */
            .parent {
              height: 25vh !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Enlist;
