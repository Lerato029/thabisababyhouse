/* ============================================OrderDetail Component================================== */
//routing
import Link from "next/link";

//online payments
import PaypalBtn from "../pages/paypalBtn";

//PATCH req module
import { patchData } from "../utils/fetchData";

//action update module
import { updateItem } from "../store/Actions";

const OrderDetail = ({ orderDetail, state, dispatch }) => {
  //state properties used
  const { auth, orders } = state;

  //==================================================================Main Functionality
  /* For admin only */
  const handleDelivered = (order) => {
    //notify user req is being processed
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    //PATCH request to change order to delivered, pass null as body
    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      //check if err returned
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      //destructuring response result
      const { paid, dateOfPayment, method, delivered } = res.result;

      //call the update item function to update state
      dispatch(
        updateItem(
          orders,
          order._id,
          {
            ...order,
            paid,
            dateOfPayment,
            method,
            delivered,
          },
          "ADD_ORDERS"
        )
      );

      //then notify of successful update
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  //return null if auth not updated yet
  if (!auth.user) return null;

  //else display order details from parent 
  return (
    <>
      {orderDetail.map((order) => (
        <div
          key={order.id}
          className="row justify-content-around"
          style={{ margin: "20px auto" }}
        >
          <div
            key={order._id}
            className="text-uppercase my-3"
            style={{ maxWidth: "580px" }}
          >
            <h2 className="text-break">Order: {order._id}</h2>
            <div className="mt-4 text-secondary">
              <h4>Shipping Details</h4>
              <p>Address: {order.address}</p>
              <p>Mobile: {order.mobile}</p>
              <div
                className={`alert ${
                  order.delivered ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.delivered
                  ? `Delivered: ${order.updatedAt}`
                  : "Not yet delivered"}
                {auth.user.role === "admin" && !order.delivered && (
                  <button
                    className="btn btn-success text-capitalize"
                    onClick={() => handleDelivered(order)}
                  >
                    Set To Delivered
                  </button>
                )}
              </div>
              <h3>Payment</h3>
              {order.method && <h6>Method: {order.method}</h6>}
              {order.paymentId && <p>PaymentId: ${order.paymentId}</p>}

              <div
                className={`alert ${
                  order.paid ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.paid
                  ? `Paid: ${order.dateOfPayment}`
                  : "payment pending"}
              </div>
              <div>
                <h4>Items Ordered:</h4>
                {order.cart.map((item) => (
                  <div
                    className="d-flex flex-row bd-highlight mb-3 justify-content-between"
                    key={item._id}
                  >
                    <img
                      src={item.images[0].url}
                      alt={item.images[0].url}
                      style={{
                        width: "60px",
                        height: "55px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className=" text-secondary px-3 ">
                      <Link href={`/product/${item._id}`}>
                        <a>{item.title}</a>
                      </Link>
                    </h5>
                    <span className="text-lowercase m-0">
                      Qty:{item.quantity} = ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {!order.paid && auth.user.role !== "admin" && (
            <div className="p-4" style={{ width: "auto" }}>
              <h2 className="mb-4 text-capitalize">Total: ${order.total}</h2>
              <PaypalBtn order={order} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default OrderDetail;
