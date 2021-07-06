import { useContext } from "react";
import { DataContext } from "../store/GlobalState";

import Link from "next/link";

const Users = () => {
  const { state, dispatch } = useContext(DataContext);
  const { users, auth } = state;

  if (!auth.user) return null;
  return (
    <table
      className=" table-hover w-100 text-capitalize table-bordered border-white text-center"
      style={{ cursor: "pointer" }}
    >
      <thead className=" text-uppercase">
        <tr>
          <th></th>
          <th>id</th>
          <th>Profile</th>
          <th>Username</th>
          <th>email</th>
          <th>admin</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={user.id} style={{ cursor: "pointer" }}>
            <td>{index + 1}</td>
            <td>{user._id}</td>
            <td>
              <img
                src={user.avatar}
                alt={user.avatar}
                style={{
                  width: "40px",
                  height: "40px",
                  overflow: "hidden",
                  objectFit: "cover",
                }}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {" "}
              {user.role === "admin" ? (
                user.root ? (
                  <i
                    className="fas fa-check"
                    style={{
                      color: "#b72ec1",
                    }}
                  >
                    Root
                  </i>
                ) : (
                  <i
                    className="fas fa-check"
                    style={{
                      color: "#b72ec1",
                    }}
                  ></i>
                )
              ) : (
                <i className="fas fa-times"></i>
              )}
            </td>

            {(auth.user.root && auth.user.email) !== user.email ? (
              <>
                <Link
                  href={
                    (auth.user.root && auth.user.email) || user.email
                      ? `/edit_user/${user._id}`
                      : "#!"
                  }
                >
                  <td>
                    <span className="badge bg-secondary" title="Edit">
                      EDIT
                    </span>
                  </td>
                </Link>
                <td>
                  <span
                    className="badge bg-danger"
                    title="Delete"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() =>
                      dispatch({
                        type: "ADD_MODAL",
                        payload: [
                          {
                            data: users,
                            id: user._id,
                            title: user.name,
                            type: "ADD_USERS",
                          },
                        ],
                      })
                    }
                  >
                    DEL
                  </span>
                </td>
              </>
            ) : (
              <td></td>
            )}
          </tr>
        ))}
      </tbody>
      {/* <tbody>
        {users.map((user, index) => (
          <tr key={user.id} style={{ cursor: "pointer" }}>
            <td >{index + 1}</td>
            <td >{user._id}</td>
            <td >
              <img
                src={user.avatar}
                alt={user.avatar}
                style={{
                  width: "40px",
                  height: "40px",
                  overflow: "hidden",
                  objectFit: "cover",
                }}
              />
            </td>
            <td >{user.name}</td>
            <td >{user.email}</td>
            <td >
              {user.role === "admin" ? (
                user.root ? (
                  <i
                    className="fas fa-check"
                    style={{
                      color: "#b72ec1",
                    }}
                  >
                    Root
                  </i>
                ) : (
                  <i
                    className="fas fa-check"
                    style={{
                      color: "#b72ec1",
                    }}
                  ></i>
                )
              ) : (
                <i className="fas fa-times"></i>
              )}
            </td>
            <td >
              <Link
                href={
                  (auth.user.root && auth.user.email) || user.email
                    ? `/edit_user/${user._id}`
                    : "#!"
                }
              >
                <a>
                  <i className="fas fa-edit  text-secondary" title="Edit"></i>
                  {"  "}
                </a>
              </Link>

              {(auth.user.root && auth.user.email) !== user.email ? (
                <i
                  className="fas fa-trash-alt text-danger"
                  title="Delete"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() =>
                    dispatch({
                      type: "ADD_MODAL",
                      payload: {
                        data: users,
                        id: user._id,
                        title: user.name,
                        type: "ADD_USERS",
                      },
                    })
                  }
                ></i>
              ) : (
                <i
                  className="fas fa-trash-alt text-danger ml-2"
                  title="Delete"
                  onClick={() =>
                    dispatch({
                      type: "ADD_MODAL",
                      payload: {
                        data: users,
                        id: user._id,
                        title: user.name,
                        type: "ADD_USERS",
                      },
                    })
                  }
                ></i>
              )}
            </td>
          </tr>
        ))}
      </tbody>  */}
    </table>
  );
};

export default Users;
