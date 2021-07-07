/* =========================================Sign Up Page================================================= */
//next elements
//https://developer.paypal.com/classic-home/

import { useEffect, useRef, useContext } from "react";
import { patchData } from "../utils/fetchData";
import { DataContext } from "../store/GlobalState";
import { updateItem } from "../store/Actions";

const paypalBtn = ({ order }) => {
  const refPay = useRef();


  //global state
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  //CAPTURE TRANSACTION FROM: https://developer.paypal.com/docs/checkout/integrate/
  useEffect(() => {
    paypal.Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: order.total,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          // This function captures the funds from the transaction.
          dispatch({
            type: "NOTIFY",
            payload: { loading: true },
          });
          return actions.order.capture().then(function (details) {
            //=======================================================PATCH REQUEST
            patchData(
              `order/payment/${order._id}`,
              { paymentId: details.payer.payer_id },
              auth.token
            ).then((res) => {
              if (res.err)
                return dispatch({
                  type: "NOTIFY",
                  payload: { error: res.err },
                });
              
              //UPDATE GLOBAL STATE
              dispatch(
                updateItem(
                  orders,
                  order._id,
                  {
                    ...order,
                    paid: true,
                    dateOfPayment: details.create_time,
                    paymentId: details.payer.payer_id,
                    method: "Paypal",
                  },
                  "ADD_ORDERS"
                )
              );

              //SUCCESS!
              return dispatch({
                type: "NOTIFY",
                payload: { success: res.msg },
              });
            });
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        },
      })
      .render(refPay.current);
  }, []);
  return <div ref={refPay}></div>;
};

export default paypalBtn;
