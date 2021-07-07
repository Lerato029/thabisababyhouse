/* ============================================Footer Component================================== */
//subscribe form
import Subscribe from "./Subscribe";

//import image
const logo = "images/logo.png";

//footer component displayed on every page
const Footer = () => {
  return (
    <footer className="container-fluid bg-dark text-white  bottom-0 ">
      <div className="card-group bg-dark">
        <div className="card bg-dark">
          <div className="card-body px-5 py-5">
            <img src={logo} className="card-img-top px-2 my-2" alt="logo" />
            <h5 className="card-title text-center mt-4 fs-3">
              NPO 2017/217305/08
            </h5>
            <p className="card-text text-center">
              Based in Leondale, South Africa
            </p>
          </div>
        </div>
        <div className="card  bg-dark mx-2 py-5">
          <h2>Contact Us</h2>
          <div className="card-body py-5">
            <p className="card-text">
              <i
                className="fas fa-phone-square-alt"
                style={{ color: "#b82ec1", paddingRight: "2%" }}
              ></i>
              Phone: 011 866-2045
            </p>
            <p className="card-text">
              <i
                className="fas fa-envelope-square"
                style={{ color: "#b82ec1", paddingRight: "2%" }}
              ></i>
              Email: info@thabisababyhouse.co.za
            </p>
          </div>
        </div>
        <div className="card bg-dark mx-2 py-5">
          <Subscribe />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
