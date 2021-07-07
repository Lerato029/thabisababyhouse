/* ============================================Notify Component================================== */
//allow to use data context in component
import { useContext } from "react";

//context
import { DataContext } from "../store/GlobalState";

//alert user of request being processed
import Loading from "./Loading";

//success and error messages
import Toast from "./Toast";

const Notify = () => {
  //get state and dispatch to update it
  const { state, dispatch } = useContext(DataContext);

  //using notify state property
  const { notify } = state;

  //conditionally render based on notify property available
  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          message={{ message: notify.error, title: "Oops!" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-danger"
        />
      )}
      {notify.success && (
        <Toast
          message={{ message: notify.success, title: "Great!" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-success"
        />
      )}
    </>
  );
};

export default Notify;
