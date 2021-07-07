/* =========================================Edit User Page================================================= */
//import statements
import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { updateItem } from "../../store/Actions";
import { useRouter } from "next/router";
import { patchData } from "../../utils/fetchData";

const EditUser = () => {
  //initialize router
  const router = useRouter();

  //query string
  const { id } = router.query;

  //global state
  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;

  //local state properties
  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [num, setNum] = useState(0);


  useEffect(() => {
    users.forEach((user) => {
      //iterate the users array from global state and get the one matching the query string id
      if (user._id === id) {
        //user to be edited
        setEditUser(user);

        //check if user is admin
        setCheckAdmin(user.role === "admin" ? true : false);
      }
    });
  }, [users]);


  //called when user checks button
  const handleChangeCheck = () => {
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  //=====================================================================PATCH
  const handleUpdate = () => {
    let role = checkAdmin ? "admin" : "user";

    //check if check box has been edited
    if (num % 2 !== 0) {

      //request being processed
      dispatch({ type: "NOTIFY", payload: { loading: true } });

      //PATCH Request to API made
      patchData(`user/${editUser._id}`, { role }, auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        dispatch(
          updateItem(
            users,
            editUser._id,
            {
              ...editUser,
              role,
            },
            "ADD_USERS"
          )
        );

        //success!
        return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      });
    }
  };


  //display user data and check box to set user to admin
  return (
    <div className=" edit_container my-3 w-100">
      <Head>
        <title>Edit User</title>
      </Head>
      <div className="container">
        <div>
          <button className="btn btn-dark" onClick={() => router.back()}>
            <i className="fas fa-chevron-left" aria-hidden="true"></i>Go Back
          </button>
        </div>
        <div className="col-md-4 mx-auto my-4">
          <h2 className="text-capitalize">Edit User</h2>
          <div className="form-group">
            <label htmlFor="name" className="d-block">
              Name
            </label>
            <input
              type="text"
              id="name"
              defaultValue={editUser.name}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="d-block">
              Email
            </label>
            <input
              type="text"
              id="email"
              defaultValue={editUser.email}
              disabled
            />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="isAdmin"
              checked={checkAdmin}
              style={{ width: "15px", height: "15px" }}
              onChange={handleChangeCheck}
            />
            <label
              htmlFor="isAdmin"
              style={{ transform: "translate(4px, -3px)" }}
            >
              isAdmin
            </label>
          </div>
          <button className="btn btn-secondary" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
