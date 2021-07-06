import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

const ProductItem = ({ product, handleChangeInput }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn btn-info " style={{ marginRight: "5px", flex: 1 }}>
            View
          </a>
        </Link>
        <button
          className="btn btn-success  "
          style={{ marginLeft: "5px", flex: 1 }}
          disabled={product.inStock === 0 ? true : false}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Buy
        </button>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`create/${product._id}`}>
          <a className="btn btn-info " style={{ marginRight: "5px", flex: 1 }}>
            Edit
          </a>
        </Link>
        <button
          className="btn btn-danger  "
          style={{ marginLeft: "5px", flex: 1 }}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [{
                data: product,
                id: product._id,
                title: product.title,
                type: "DELETE_PRODUCT",
              }],
            })
          }
        >
          Delete
        </button>
      </>
    );
  };

  return (
    <div className="card bg-dark" style={{ width: "18rem" }}>
      {auth.user && auth.user.role === "admin" && (
        <input
          id="flexCheckDefault"
          type="checkbox"
          className="form-check-input position-absolute"
          style={{ height: "25px", width: "25px" }}
          checked={product.checked}
          onChange={() => handleChangeInput(product._id)}
        />
      )}
      <img
        src={product.images[0].url}
        className="card-img-top"
        alt={product.images[0].url}
      />
      <div className="card-body text-white bg-dark">
        <h5 className="card-title text-capitalize" title={product.title}>
          {product.title}
        </h5>
        <div className="d-flex flex-row bd-highlight mb-3 justify-content-between">
          <h6 className="text-white">${product.price}</h6>
          {product.inStock > 0 ? (
            <h6 className="text-dark">In Stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-dark">Out of Stock</h6>
          )}
        </div>
        <p className="card-text" title={product.description}>
          {product.description}
        </p>
        <div></div>
        {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
      </div>
    </div>
  );
};

export default ProductItem;
