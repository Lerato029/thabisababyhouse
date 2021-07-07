/* =========================================Order Details Page================================================= */
//import statements
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";

//child component
import OrderDetail from "../../components/OrderDetail";

const OrderDetails = () => {

  //global state
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;


  //initialize router
  const router = useRouter();

  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    //filter out order that matches the URL query id
    const newArray = orders.filter((order) => order._id === router.query.id);
    //new value for orderDetail state
    setOrderDetail(newArray);
  }, [orders]);

  if (!auth.user) return null;
  //display application details
  return (
    <div className="my-3 container">
      <Head>
        <title>Order Details</title>
      </Head>
      <div>
        <button className="btn btn-secondary" onClick={() => router.back()}>
          <i className="fas fa-chevron-left" aria-hidden="true"></i> Return
        </button>
      </div>
      <OrderDetail
        orderDetail={orderDetail}
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
};

export default OrderDetails;
