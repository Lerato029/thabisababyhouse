/* =========================================Sign Up Page================================================= */
//next elements
import Head from "next/head";

//images
const bgURL1 =
  "https://c.pxhere.com/photos/e1/24/foot_baby_baby_feet_newborn_child_feet_infant_small-627869.jpg!d";
const bgURL3 =
  "https://cdn2.photostockeditor.com/c/3012/grey-gray-scale-photography-of-girl-walking-towards-destination-black-and-white-black-and-white-image.jpg";
const bgURL2 =
  "https://c.pxhere.com/photos/6d/65/girl_child_toddler_baby_young_pink_polka_dots-386126.jpg!d";
const bgURL4 =
  "https://p1.pxfuel.com/preview/700/927/770/baby-feet-children-small-tear-black-and-white.jpg";
const logoURL = "images/logo.png";

/* =========JSX Featuring JSX Styling */
const Home = () => {

  //array width details of sponsors
  const sponsors = [
    {
      name: "Jacks Paint",
      img: "https://www.jackspaint.co.za/images/logo/logo-with-background.jpg",
    },
    {
      name: "Tekkie Tax",
      img: "https://tekkietax.org/wp-content/uploads/2019/10/GENERIC-LOGO-NO-DATE-A5-FC-copy-1.jpg",
    },
    {
      name: "Spur",
      img: "https://www.spursteakranches.com/img/logo.svg",
    },
    {
      name: "Startime Players",
      img: "https://scontent-jnb1-1.xx.fbcdn.net/v/t1.18169-9/1236107_643999472284933_1060883411_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=8qeQxzI47cYAX_eqqoF&_nc_ht=scontent-jnb1-1.xx&oh=d6f7a328342c8c52d3ac24318f708819&oe=60E6AA02",
    },
    {
      name: "Community Bible Church",
      img: "",
    },
    {
      name: "Lion Marketing",
      img: "https://www.lionmarketing.co.za/wp-content/uploads/2015/04/lion-marketing-logo.png",
    },
    {
      name: "Diesel Electric Services",
      img: "http://www.dieselelectricservices.co.za/assets/theme/assets/base/img/layout/footer-logo-2.png",
    },
    {
      name: "JHB Pallets",
      img: "http://www.jhbpallets.co.za/images/pallet-manufacturing.png",
    },
    {
      name: "CSA",
      img: "https://static1.s123-cdn-static-a.com/uploads/3097214/400_5f8686249752f.png",
    },
    {
      name: "McCain",
      img: "https://www.mccain.co.za/images/logo/logo-corporate.png",
    },
    {
      name: "Klimrame",
      img: "http://www.klimrame.co.za/Portals/0/logo.png",
    },
    {
      name: "Malaysian Switch Gear",
      img: "http://www.malaysianswitchgear.co.za/assets/theme/assets/base/img/layout/logos/logo-3.png",
    },
  ];
  return (
    <div className="container-fluid p-0">
      <Head>
        <title>Home</title>
      </Head>
      <div
        className="parent"
        style={{
          padding: "-20%",
          width: "100%",
          height: "92vh",

          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "100%",
          backgroundImage: `url(${bgURL1})`,
        }}
      >
  
          <div
            className="container"
            style={{ background: "#0000002a", height: "100%", width: "100%" }}
          >
            <img
              src={logoURL}
              className="img-fluid  mx-auto d-block"
              style={{
                padding: "20% 20%",
                zIndex: "18",
                filter: "brightness(100%)",
              }}
              alt="Logo"
            />
          </div>
        
      </div>
      
      <div className="card p-0">
        <div className="row g-0 p-0">
          <div className="col-md-8">
            <img src={bgURL3} className="img-fluid " alt="child walking" />
          </div>
          <div className="col-md-4">
            <div className="card-body text-center mt-5">
              <h5 className="card-title mt-5">
                Thabisa Baby House exists to...
              </h5>
              <p className="card-text">
                to care for babies who are abandoned, orphaned, or given up for
                adoption. We want to take them from this hopeless situation into
                a place of joy by giving them much needed love and care, while
                preparing them to connect with Forever Families.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section
        className="parent container-fluid bg-light"
        style={{
          margin: "0",
          height: "92vh",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "100%",
          backgroundImage: `url(${bgURL2})`,
        }}
      >
        <h1 className="text-center text-lg text-white display-1 fw-bold">
          A place of hope
        </h1>
      </section>

      <div className="card  ">
        <div className="row g-0">
          <div className="col-md-4">
            <div className="card-body text-center my-5">
              <h5 className="card-title mt-5">How can you contribute?</h5>
              <p className="card-text">
                Partner with us in caring for abandoned babies
              </p>
              <a
                href="/donate"
                className="btn btn-dark "
                style={{ background: "#b82ec1", color: "white" }}
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="col-md-8">
            <img src={bgURL4} className="img-fluid " alt="..." />
          </div>
        </div>
      </div>
      
      <section
        className="parent container-fluid bg-light"
        style={{
          margin: "0",
          height: "92vh",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "100%",
          backgroundImage: `url(https://p1.pxfuel.com/preview/736/677/224/hand-hands-dom-worship-man-handwriting.jpg)`,
        }}
      >
        <h1 className="text-center text-lg text-white display-2 fw-bold">
          To all our sponsors, thank you!
        </h1>
      </section>
      
      <div className="row row-cols-1 row-cols-md-6 g-4 p-2">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="col">
            <div className="card bg-dark text-white">
              {sponsor.img ? (
                <img
                  src={sponsor.img}
                  className="card-img"
                  alt={sponsor.name}
                  style={{ height: "150px", opacity: "0.3" }}
                />
              ) : (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk4RY4BQcwvUWlm_LcRrhT-AA98rEzXlfKvkztnk0UAVFnA8ZTdh1zhFJ8MY8-EjQeeTs&usqp=CAU"
                  className="card-img"
                  alt="black background"
                  style={{ height: "150px" }}
                />
              )}
              <div className="card-img-overlay">
                <h5 className="card-title  text-center">{sponsor.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>
        {`
          @media only screen and (max-width: 1024px) {
            /* For tablets: */
            .parent {
              height: 50vh !important;
              background: black;
              background-size: "90%";
            }
          }
          @media only screen and (max-width: 768px) {
            /* For mobile phones: */
            .parent {
              height: 50vh !important;
            }
          }
          @media only screen and (max-width: 411px) {
            /* For smaller mobile phones: */
            .parent {
              height: 25vh !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
