import Head from "next/head";

const bgURL1 =
  "https://post.medicalnewstoday.com/wp-content/uploads/2020/08/black_parent_and_child_holding_hands_closeup-1200x628-facebook-1200x628.jpg";
const bgURL3 =
  "https://image.sciencenordic.com/1381037.jpg?imageId=1381037&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=630";
const bgURL2 =
  "https://montikids.com/montessori/wp-content/uploads/2019/03/baby-start-walking-1024x684.jpg";
const bgURL4 =
  "https://cdn1.photostockeditor.com/c/1512/baby-sleeping-baby-on-stroller-furniture-furniture-image.jpg";

const About = () => {
  const staff = [
    {
      name: "Kim",
      img: "https://p1.pxfuel.com/preview/153/519/790/smile-woman-short-hair-wall.jpg",
    },
    {
      name: "Rashmi",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Closeup_of_young_woman_smiling_%2848545968371%29.jpg",
    },
    {
      name: "Busi",
      img: "https://cdn2.photostockeditor.com/c/2312/people-smiling-woman-wearing-turban-person-person-image.jpg",
    },
  ];
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
        <title>About</title>
      </Head>
      <div
        className="parent"
        style={{
          padding: "-20%",
          width: "100%",
          height: "100%",

          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundImage: `url(${bgURL1})`,
        }}
      >
        <div
          className="card-body text-center text-white pt-5"
          style={{ background: "#0000002a", height: "100%" }}
        >
          <h1 className=" display-1 fw-bold my-5">About Us</h1>
        </div>
      </div>

      <div className="card ">
        <div className="row g-0">
          <div className="col-md-8">
            <img src={bgURL3} className="img-fluid " alt="..." />
          </div>
          <div className="col-md-4">
            <div className="card-body text-center my-5">
              <h5 className="card-title mt-5">A Place of Joy...</h5>
              <p className="card-text">
                We are a registered, temporary place of safety with the ability
                to look after babies from birth until 3yrs old. We strive to
                take these abandoned babies from their hopeless situation into a
                place of joy by giving them the much needed love, care and
                attention that they need.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card  ">
        <div className="row g-0">
          <div className="col-md-4">
            <div className="card-body text-center my-5">
              <h5 className="card-title mt-5">A Place of Refuge...</h5>
              <p className="card-text">
                As we are only a place of safety, our final goal is to put these
                babies into happy, forever families through adoption. We use a
                private adoption agency, called Abba Adoptions Specialists. They
                do all the social worker side of this ministry from bringing the
                babies to us, to finding them families. This frees us up to just
                concentrate on the care of the babies.
              </p>
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
          backgroundImage: `url(https://cdn.pixabay.com/photo/2020/07/28/20/41/woman-5446268_1280.jpg)`,
        }}
      >
        <h1 className="text-center text-lg text-white display-1 fw-bold">
          Meet Our Staff
        </h1>
      </section>
      <div
        className="row row-cols-1 row-cols-md-3 g-4 p-2"
        style={{ background: "#ba93bd" }}
      >
        {staff.map((member, index) => (
          <div key={index} className="col">
            <div className="card h-100 bg-dark text-center text-white">
              <img
                src={member.img}
                className="card-img-top img-fluid"
                alt={member.img}
                style={{ height: "300px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card ">
        <div className="row g-0">
          <div className="col-md-8">
            <img src={bgURL2} className="img-fluid " alt="child and parents" />
          </div>
          <div className="col-md-4">
            <div className="card-body text-center my-5">
              <h5 className="card-title mt-5">How can you contribute?</h5>
              <p className="card-text">Partner with us in caring for abandoned babies</p>
              <a
                href="/donate"
                className="btn btn-dark "
                style={{ background: "#b82ec1", color: "white" }}
              >
                Learn More
              </a>
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

export default About;
