import Link from "next/link";

import { patchData } from "../utils/fetchData";
import { updateItem } from "../store/Actions";

const EnlistApDetail = ({ enlistApDetail, state, dispatch }) => {
  console.log(enlistApDetail)
  const { auth, enlistApps } = state;
  const handleApproved = (enlistAp) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    //make PATCH request to change application to approved
    patchData(`enlist/approved/${enlistAp._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      //destructuring response result
      console.log(res)
      const { approved } = res.result;
      //call the update item function
      dispatch(
        updateItem(
          enlistApps,
          enlistAp._id,
          {
            ...enlistAp,
            approved,
          },
          "ADD_ENLIST_APPS"
        )
      );
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  if (!auth.user) return null;
  return (
    <>
      {enlistApDetail.map((enlistAp) => (
        <div
          key={enlistAp.id}
          className="row justify-content-around"
          style={{ margin: "20px auto" }}
        >
          <div
            key={enlistAp._id}
            className="text-capitalize my-3"
            style={{ maxWidth: "580px" }}
          >
            <h2 className="text-break">Ap: {enlistAp._id}</h2>
            <div className="mt-4 text-secondary text-capitalize">
              <h4>Application Details</h4>
              <p>Name: {enlistAp.fullName}</p>
              <p>Mobile: {enlistAp.mobile}</p>
              <p>Role: {enlistAp.role}</p>
              <div
                className={`alert ${
                  enlistAp.approved ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {enlistAp.approved
                  ? `Approval Date: ${enlistAp.updatedAt}`
                  : "Not approved"}
                {auth.user.role === "admin" && !enlistAp.approved && (
                  <button
                    className="btn btn-success text-capitalize"
                    onClick={() => handleApproved(enlistAp)}
                  >
                    Set To Approved
                  </button>
                )}
              </div>
             
            
            </div>
          </div>
          
        </div>
      ))}
    </>
  );
};

export default EnlistApDetail;
