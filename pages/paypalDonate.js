//https://developer.paypal.com/classic-home/

import { useEffect, useRef} from "react";


const paypalBtn = ({ total }) => {
  const refPay = useRef();



  //CAPTURE TRANSACTION FROM: https://developer.paypal.com/docs/checkout/integrate/
  useEffect(() => {
    paypal.Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total,
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
            // This function shows a transaction success message to your buyer.
           
            return dispatch({
              type: "NOTIFY",
              payload: { success: `Transaction completed by ${details.payer.name.given_name}` },
            });
            /* alert("Transaction completed by " + details.payer.name.given_name); */
          });
        },
      })
      .render(refPay.current);
  }, []);
  return <div ref={refPay}></div>;
};

export default paypalBtn;
