import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";

import EnlistApDetail from "../../components/EnlistApDetail";

const EnlistApDetails = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, enlistApps } = state;

  const router = useRouter();

  const [enlistApDetail, setEnlistApDetail] = useState([]);

  useEffect(() => {
    //filter out application that matches the URL query id
    const newArray = enlistApps.filter((ap) => ap._id === router.query.id);
    
    //new value for enlistAprDetail state
    setEnlistApDetail(newArray);
  }, [enlistApps]);

  if (!auth.user) return null;
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
