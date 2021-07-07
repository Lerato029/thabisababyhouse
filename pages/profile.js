/* =========================================Profile Page================================================= */
//next elements
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { DataContext } from "../store/GlobalState";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";
import { imageUpload } from "../utils/imageUpload";

//child component
import Users from "../components/Users";

const Profile = () => {
  const initialState = {
    avatar: "",
    name: "",
    password: "",
    c_password: "",
  };

  const [data, setData] = useState(initialState);

  //destructuring data properties
  const { avatar, name, password, c_password } = data;

  const { state, dispatch } = useContext(DataContext);
  const { auth, notify, orders, enlistApps } = state;

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid(name, auth.user.email, password, c_password);

      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }
    if (name !== auth.user.name || avatar) updateInfo();
  };

  //================================================================PACTH REQUEST
  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    //Req to update password
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const changePic = (e) => {
    const pic = e.target.files[0];

    if (!pic)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image does not exist" },
      });
    if (pic.size > 1024 * 1024)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image should be less than or 1mb in size" },
      });
    if (pic.type !== "image/jpeg" && pic.type !== "image/png")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please upload a jpeg or png image" },
      });
    setData({ ...data, avatar: pic });
  };

  const updateInfo = async () => {
    let media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    if (avatar) media = await imageUpload([avatar]);
    
    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({
        type: "AUTH",
        payload: { token: auth.token, user: res.user },
      });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  //check to prevent error when page refreshes
  if (!auth.user) return null;

  //return profile and tables or one table
  return (
    <div className="profile_container h-100 container-fluid ">
      <Head>
        <title>Profile</title>
      </Head>

      <section className="row h-100 text-dark">
        <div className="col-md-2 ">
          <h3 className="text-center text-capitalize">
            {auth.user.role === "user" ? "Profile" : "Admin"}
          </h3>
          <div className="profilePic">
            <img
              src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
              alt="Profile image"
            />
            <span>
              <p>
                <i className="fas fa-camera-retro"></i> Change{" "}
              </p>

              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={changePic}
              />
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              placeholder="Please enter name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              defaultValue={auth.user.email}
              className="form-control"
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Change Password</label>
            <input
              type="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="Please enter new password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="c_password">Confirm Password</label>
            <input
              type="password"
              name="c_password"
              value={c_password}
              className="form-control"
              placeholder="Confirm new password"
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-dark my-2"
            disabled={notify.loading}
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
        <div className="col-md-10 text-dark table-responsive ">
          <div className="my-3">
            <h3 className="text-capitalize">Orders</h3>
            <table
              className=" table-hover w-100 text-capitalize table-bordered border-white text-center"
              style={{ cursor: "pointer" }}
            >
              <thead className=" text-uppercase">
                <tr>
                  <th></th>
                  <th>id</th>
                  <th>date</th>
                  <th>contact</th>
                  <th>total</th>
                  <th>delivered</th>
                  <th>paid</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.mobile}</td>
                    <td>${order.total}</td>
                    <td>
                      {order.delivered ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </td>
                    <td>
                      {order.paid ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <td>
                          <span className="badge bg-secondary" title="More">
                            MORE
                          </span>
                        </td>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {enlistApps.length > 0 && (
            <div className="my-3">
              <h3 className="text-capitalize">Applications</h3>
              <table
                className=" table-hover w-100 text-capitalize table-bordered border-white text-center"
                style={{ cursor: "pointer" }}
              >
                <thead className=" text-uppercase">
                  <tr>
                    <th></th>
                    <th>id</th>
                    <th>date</th>
                    <th>total</th>
                    <th>delivered</th>
                    <th>paid</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {enlistApps.map((enlist, index) => (
                    <tr key={enlist._id}>
                      <td>{index + 1}</td>
                      <td>{enlist._id}</td>
                      <td>{new Date(enlist.createdAt).toLocaleDateString()}</td>
                      <td>{enlist.fullName}</td>
                      <td>{enlist.mobile}</td>
                      <td>
                        {enlist.approved ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <i className="fas fa-times"></i>
                        )}
                      </td>
                      <Link href={`/enlist/${enlist._id}`}>
                        <td>
                          <span className="badge bg-secondary" title="More">
                            MORE
                          </span>
                        </td>
                      </Link>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {auth.user.role === "admin" && (
            <div className="my-3">
              <h3 className="text-capitalize">Users</h3>
              <Users />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
