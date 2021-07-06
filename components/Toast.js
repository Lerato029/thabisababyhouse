

const Toast = ({ message, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show  text-light ${bgColor}`}
      role="alert"
      ariaLive="assertive"
      ariaAtomic="true"
      style={{
        top: "10%",
        right: "8px",
        zIndex: 8,
        maxWidth: "250px",
        position: "fixed",
      }}
    >
      <div className={`text-white toast-header ${bgColor}`}>
        <strong className="me-auto">{message.title}</strong>
        <button
          type="button"
          className="btn-close "
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={handleShow}
        ></button>
      </div>
      <div className="toast-body">{message.message}</div>
    </div>
  );
};

export default Toast;
