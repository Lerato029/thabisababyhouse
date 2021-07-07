/* =========================================Cart Page================================================= */
//import statements
import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import Link from "next/link";
import { getData, postData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;

  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [callback, setCallback] = useState(false);

  //initializing function
  const router = useRouter();

  useEffect(() => {
    const getTotal = () => {
      //reduce() method to execute reducer function on each element of the array to get single output value.
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(res);
    };
    //call getTotal
    getTotal();
  }, [cart]);

  useEffect(() => {
    const LSCart = JSON.parse(localStorage.getItem("thabisa_cart01"));
    if (LSCart.length > 0) {
      let newArray = [];
      const updateCart = async () => {
        for (const item of LSCart) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, images, price, inStock, sold } = res.product;
          if (inStock > 0) {
            newArray.push({
              _id,
              title,
              images,
              price,
              inStock,
              quantity: item.quantity > inStock ? 1 : item.quantity,
              sold,
            });
          }
        }
        dispatch({ type: "ADD_CART", payload: newArray });
      };
      updateCart();
    }
  }, [callback]);

  const handlePayment = async () => {
    if (!address || !mobile)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please fill out all fields" },
      });
    let newCart = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }
    if (newCart.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: "NOTIFY",
        payload: { error: "The product's out of stock or not enough quantity" },
      });
    }
    dispatch({
      type: "NOTIFY",
      payload: { loading: true },
    });

    postData("order", { address, mobile, cart, total }, auth.token).then(
      (res) => {
        if (res.err)
          return dispatch({
            type: "NOTIFY",
            payload: { error: res.err },
          });

        dispatch({ type: "ADD_CART", payload: [] }); //clearing cart on successful purchase
        const newOrder = {
          ...res.newOrder,
          user: auth.user,
        };
        dispatch({
          type: "ADD_ORDERS",
          payload: [...orders, res.newOrder],
        });
        dispatch({
          type: "NOTIFY",
          payload: { success: res.msg },
        });
        //direct user to see their order number and details
        return router.push(`/order/${res.newOrder._id}`);
      }
    );
  };

  //check if cart is empty
  if (cart.length === 0)
    return (
      <div className="container">
        <br />
        <img
          className="img-responsive w-50 mx-auto d-block"
          src="https://mysibi.com/pub/static/version1622037694/frontend/MageBig/martfury_layout03/en_US/images/empty-cart.svg"
          alt="Empty cart"
        />
        <br />
        <h1 className="text-center text-uppercase">Cart Empty</h1>
      </div>
    );
  return (
    <div className="container">
      <Head>
        <title>Cart</title>
      </Head>
      <div className="row mx-auto">
        <div className="col-md-8 text-secondary table-responsive my-3">
          <h2 className="text-uppercase">Welcome To Your Cart</h2>
          <table>
            <tbody>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  dispatch={dispatch}
                  cart={cart}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <form>
            <h2>Shipping</h2>
            <label htmlFor="address">Address</label>
            <input
              type="test"
              name="address"
              id="address"
              className="form-control mb-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              className="form-control mb-2"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </form>
          <h3>
            Total: <span className="text-info">${total}.00</span>
          </h3>

          <Link href={auth.user ? "#!" : "/signin"}>
            <a className="btn btn-success" onClick={handlePayment}>
              Pay Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
