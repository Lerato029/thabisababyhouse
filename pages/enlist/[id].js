/* =========================================Enlist Page================================================= */
//import statements
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";


//child components
import EnlistApDetail from "../../components/EnlistApDetail";

const EnlistApDetails = () => {
  //global state
  const { state, dispatch } = useContext(DataContext);
  const { auth, enlistApps } = state;

  //initialize router
  const router = useRouter();

  const [enlistApDetail, setEnlistApDetail] = useState([]);

  useEffect(() => {
    //filter out application that matches the URL query id
    const newArray = enlistApps.filter((ap) => ap._id === router.query.id);
    
    //new value for enlistAprDetail state property
    setEnlistApDetail(newArray);
  }, [enlistApps]);
  
  //return null if auth not updated yet
  if (!auth.user) return null;

  //display application details
  return (
    <div className="my-3 container">
      <Head>
        <title>Application Details</title>
      </Head>
      <div>
        <button className="btn btn-secondary" onClick={() => router.back()}>
          <i className="fas fa-chevron-left" aria-hidden="true"></i> Return
        </button>
      </div>
      <EnlistApDetail
        enlistApDetail={enlistApDetail}
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
};

export default EnlistApDetails;
