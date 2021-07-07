/* ============================================Delete Modal Component================================== */
//import statements
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";

//action module
import { deleteItem } from "../store/Actions";

//DELETE API req module
import { deleteData } from "../utils/fetchData";

//next.js routing
import { useRouter } from "next/router";


const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { modal, auth } = state;
  const router = useRouter();

  //============================modal delete functions========================
  /* DELETE user */
  const deleteUser = (item) => {
    //notify req being processed
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    //update user state property 
    dispatch(deleteItem(item.data, item.id, item.type));

    //DELETE req to API
    deleteData(`user/${item.id}`, auth.token).then((res) => {
      //check if err returned
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      //else item deleted!
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  /* DELETE categories same as delete user but route is different*/
  const deleteCategories = (item) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    dispatch(deleteItem(item.data, item.id, item.type));
    deleteData(`categories/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  /* DELETE user same as delete user but route is different**/
  const deleteProduct = (item) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    deleteData(`product/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      //refresh page to show new state of products on page
      return window.location.reload();
    });
  };

  const handleSubmit = () => {
    //call functions only when modal isn't empty
    if (modal.length !== 0) {
      //loop through modal array to see which delete function to use
      for (const item of modal) {
        if (item.type === "ADD_USERS") deleteUser(item);

        if (item.type === "ADD_CATEGORIES") deleteCategories(item);

        if (item.type === "DELETE_PRODUCT") deleteProduct(item);
      }

      //reset modal state property
      dispatch({ type: "ADD_MODAL", payload: [] });
    }
  };

  //title is rendered when the modal array isn't empty
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title text-capitalize text-danger"
              id="staticBackdropLabel"
            >
              {modal.length !== 0 && modal[0].title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleSubmit}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
