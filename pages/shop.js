/* =========================================Sign Up Page================================================= */
//import statements
import { getData } from "../utils/fetchData";
import { useState, useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Head from "next/head";
import ProductItem from "../components/product/ProductItem";
import Link from "next/link";


const Shop = (props) => {
  const [products, setProducts] = useState(props.products);
  const [check, setCheck] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const handleChangeInput = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const handleCheckAll = () => {
    products.forEach((product) => {
      product.checked = !check;
    });

    setProducts([...products]);
    setCheck(!check);
  };

  const handleDeleteAll = () => {
    let newArray = [];
    products.forEach((product) => {
      if (product.checked) {
        newArray.push({
          data: "",
          id: product._id,
          title: "Delete All Products Selected?",
          type: "DELETE_PRODUCT",
        });
      }
    });
    dispatch({
      type: "ADD_MODAL",
      payload: newArray,
    });
  };
  return (
    <div className="container-fluid p-0">
      <Head>
        <title>Shop</title>
      </Head>
      <div
        className="parent"
        style={{
          padding: "-20%",
          width: "100%",
          height: "100%",

          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundImage: `url(https://cdn2.photostockeditor.com/c/3012/grey-gray-scale-photography-of-girl-walking-towards-destination-black-and-white-black-and-white-image.jpg)`,
        }}
      >
        <div
          className="card-body text-center text-white pt-5"
          style={{ background: "#0000002a", height: "100%" }}
        >
          <h1 className=" display-1 fw-bold my-5">Shop Our Merch</h1>
        </div>
      </div>
      {auth.user && auth.user.role === "admin" ? (
        <div
          className="delete_all btn btn-danger mt-2"
          style={{ marginBottom: "-10px" }}
        >
          <input
            id="flexCheckDefault"
            type="checkbox"
            className="form-check-input"
            style={{ marginRight: "10px", height: "25px", width: "25px" }}
            value={check}
            onChange={handleCheckAll}
          />
          <button
            className="btn btn-danger ml-2"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        </div>
      ) : (
        <div className=" justify-content-end " style={{ padding: "20px" }}>
          <Link href="/cart">
            <a>
              <i
                className="fab fa-opencart position-relative"
                aria-hidden="true"
              ></i>{" "}
              <span
                className="mt-2"
                style={{
                  padding: "1px 6px",
                  background: "#b82ec1",
                  borderRadius: "50%",
                  top: "-1px",
                  left: "-1px",

                  color: "white",
                  fontSize: "14px",
                }}
              >
                {cart.length}
              </span>
              Cart
            </a>
          </Link>
        </div>
      )}

      <div className="products">
        {products.length === 0 ? (
          <h2>No products stocked</h2>
        ) : (
          products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              handleChangeInput={handleChangeInput}
            />
          ))
        )}
      </div>
    </div>
  );
};

//prerender data passed as props to shop component
export async function getServerSideProps() {
  const res = await getData("product");
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}

export default Shop;
