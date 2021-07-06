import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { updateItem } from "../../store/Actions";
import { useRouter } from "next/router";
import { patchData } from "../../utils/fetchData";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;
  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    users.forEach((user) => {
      //iterate the users array and get the one matching the query string id
      if (user._id === id) {
        setEditUser(user);
        setCheckAdmin(user.role === "admin" ? true : false);
      }
    });
  }, [users]);

  const handleChangeCheck = () => {
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  const handleUpdate = () => {
    let role = checkAdmin ? "admin" : "user";
    //check if check box has been edited
    if (num % 2 !== 0) {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
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
        return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      });
    }
  };

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
