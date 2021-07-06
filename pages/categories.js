import Head from "next/head";
import { useContext, useState } from "react";
import { DataContext } from "../store/GlobalState";
import { updateItem } from "../store/Actions";
import { postData, putData } from "../utils/fetchData";
import { useRouter } from 'next/router'

const Categories = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter()

  const addCategory = async () => {
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: `You're not authorized!`,
        },
      });
    if (!name)
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: `Please enter a name`,
        },
      });

    dispatch({
      type: "NOTIFY",
      payload: {
        loading: true,
      },
    });

    let res;

    if (id) {
      res = await putData(`categories/${id}`, { name }, auth.token);
      if (res.err)
        return dispatch({
          type: "NOTIFY",
          payload: {
            error: res.err,
          },
        });
      //don't have to reload page to get new added categories
      dispatch(updateItem(categories, id, res.category, "ADD_CATEGORIES"));
    } else {
      //adding posts
      res = await postData("categories", { name }, auth.token);
      if (res.err)
        return dispatch({
          type: "NOTIFY",
          payload: {
            error: res.err,
          },
        });
      //don't have to reload page to get new added categories
      dispatch({
        type: "ADD_CATEGORIES",
        payload: [...categories, res.newCategory],
      });
    }

    //reset variables after update complete
    setName("");
    setId("");

    //notify user of successful update
    return dispatch({
      type: "NOTIFY",
      payload: {
        success: res.msg,
      },
    });
  };

  const handleEdit = (category) => {
    setId(category._id);
    setName(category.name);
  };

  return (
    <div className="col-md-6 mx-auto my-3">
      <Head>
        <title>Categories</title>
      </Head>
      <button className="btn btn-dark my-5" onClick={() => router.push("/create") }>
        <i className="fas fa-chevron-left"></i> Return
      </button>
      <form className="row align-items-center">
        <div className="col-md-8 mx-0">
          
          <input
            type="text"
            className="form-control"
            placeholder="Add new category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <button className="btn btn-dark w-100" onClick={addCategory}>
            {id ? "Update" : "Add Category"}
          </button>
        </div>
      </form>
      {categories.map((category) => (
        <div key={category._id} className="card my-2 text-uppercase">
          <div className="card-body d-flex justify-content-between bg-dark text-white">
            <p className="card-text">{category.name}</p>
            <div style={{ cursor: "pointer" }}>
              <i
                className="fas fa-edit mr-2 "
                onClick={() => handleEdit(category)}
              ></i>
              <i
                className="fas fa-trash text-danger ml-5"
                aria-hidden="true"
                style={{ fontSize: "18px" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={() =>
                  dispatch({
                    type: "ADD_MODAL",
                    payload: [{
                      data: categories,
                      id: category._id,
                      title: category.name,
                      type: "ADD_CATEGORIES",
                    }],
                  })
                }
              ></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
