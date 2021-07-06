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
      <section>
        <div class="loader">
          <div class="upper ball"></div>
          <div class="right ball"></div>
          <div class="lower ball"></div>
          <div class="left ball"></div>
        </div>
      </section>
    </div>
  );
};

export default Loading;
