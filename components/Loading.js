/* ============================================Loading Component================================== */
//Notify child component
const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        background: "rgba(0, 0, 0, 0.527)",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 8,
      }}
    >
      <section
        style={{
          background: "rgba(0, 0, 0, 0.527)",
          color: "white",
          top: 0,
          left: 0,
          zIndex: 8,
        }}
      >
        <div className="loader">
          <div className="upper ball"></div>
          <div className="right ball"></div>
          <div className="lower ball"></div>
          <div className="left ball"></div>
        </div>
      </section>
    </div>
  );
};

export default Loading;
