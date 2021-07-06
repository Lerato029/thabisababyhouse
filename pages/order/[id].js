import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";

import OrderDetail from "../../components/OrderDetail";

const OrderDetails = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  const router = useRouter();

  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    //filter out order that matches the URL query id
    const newArray = orders.filter((order) => order._id === router.query.id);
    //new value for orderDetail state
    setOrderDetail(newArray);
  }, [orders]);

  if (!auth.user) return null;
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
