//react hook for creating state properties
import { useState } from "react";

//next imports
import Head from "next/head";
import Link from "next/link";

//Paypal button configured for donations
import PayPalDonate from "./paypalDonate";

const Donate = () => {
  //============state==================
  const [total, setTotal] = useState(10);
  const [payOnline, setPayOnline] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPayOnline(true);
  };

  //donation packages
  const donations = [
    {
      name: "Disposable Nappies Sizes 0-6",
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQVFRUSERESEhESFREREBERERERDw8QGBQZGRgUGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISHjQhISExND8xNDQ0NDYxMTQ0NDg0NDQxNDQ0NDE0MTE0NDQ0NDQ0MTQ0NDQxNDQ0NDQ0NDE0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAIEBQYBB//EADwQAAIBAgQDBgQEBAUFAQAAAAECAAMRBBIhMQVBUSIyYXGBkQYTofAUQrHBFWLR4TNSgsLxY3KSorJD/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAJBEBAQACAgICAgIDAAAAAAAAAAECERIxAyEEQSJxUWETMkL/2gAMAwEAAhEDEQA/AMuohVEYghlEwbo2OHZmQxXfabDHd2ZDE99vOViWQAEKBGrCiVSjqidtEojrRGjYgSOBJVeAUSp0i9m2nDHThjM2OE4I6BGMJy0eYyBV1ZJpGR1krC0Wdgii7MbDw8YqcW3BsH8x8xHYTU+LchNbRpgSNw/CimioOW5/zHmZYLOLyZcq9DxYccXG0Eg169obF1bCZ7H4zTeThhteeUkc4jiyxsPWUde51Mk0nzXjK4nbjjxjgzz5UECHwy9qCAh8MO1KqIl1RJOEGkDVEk4UaSFpaUyRYC5tGJQdSMwIkzBuFJJ2Itfpt/STajoRoym52DAmIIDLBsJIYQTiJQFUdkyjUduX9YdkyhQduOJqfFOmKAWaCFURiCEWIInEO7MhX77ec2HEtpkKvebzlQsjFhBGLCCVSh6x04scBEoCsINUh6o1gM+/rGj7BnDHCIiUDAI7LOhYUJAgcsWSSFSECQCKKc2nw/wkInzH0dxfXdV5CVHBOFmq99MiFSb/AJm3C+U2+FwAOrnOb6A93ToJh5s/p0+DD/qoBrC9l18gTCs7KMzKyrpqQbevSXCUUzgBQOXrO8RUFGS2hE5tx1arGcXxYtYHWZ2q5Y+E9Fw2HpvSJZFYqSjXAOv2ZjuN4RadQhBZCLjpfnab+GzenN58ctb+kLCUrgxmJpkS8+H8JnRza9iv6GB45hcq3tzE6fpyqQCHwo7UGBJGFHaipxJqyXhRpItWSsKNJC06mlxOpTsYTDiHZJKgGjHEIRGvAI9cdkyjpDty9xHdMpKA7ccTUxoo19zFALdYRYxYRYgh8T2mPqd4+Zmv4pt6TIPufMyoWTiwgg1hBKpCLHiMWPESkfEvIgeGxRkW8qT0yt9iBo68CDHgx6GxFMMpgFhFhobFWPvGJCWhobaz4RdcmXTVnzdcwsR9Joi2XL0DfQ6fvPOuH4xqTqwPZzLnHIrfU+drzb1sYTfTTQi3gf7Tl8uNl27PBnLjr+FhiWIBYbjURPWD0kqH86g+4kCq7kMdbWNhbmNoLhdQvh/BC9P2Yi/0mXH03370kcGqWNdOWZHH+oEf7ZnviddUPK7CW+BVlqVANmp3Po2n6mUfxETlQfzfXLr+s08c/KM/L/pVj8KVgEdeeZT6WgviVwUtzzLaRPh/h9eqG+SoOUqHZmCqt9v0O009H4RzgNiarMQblKeif+RFz52E7NPPucx7YDLD4UdqbXE/DOG07VSmG7pDFyRzJuDYTJmiq1HVHzorEK9rZx1k1WOUy9wqsl4XaRqw1kvDDSQ0WOGEkuIDDQ7GSoBhBOIciDcQCNie6ZSYbvmXmK7plJhe+Y4VSXOpinH3MUZLhYVYJYZZIV/FdpkW3PmZruK7GZE7nzMqFkSx4jFjxKIQR0asfEpBxciydiKd4AUDLlZZT2CIRYRcOYRcOYbLVDUS84V8OYiuoemqhD3WdwobW1wN5WLQM9B+D6jPRSmbDK/y0bmQbHUdO1HPaM7xm1bhvgV//wBKyL4IjVD9bSU3wWgBHz6l+TZEC+3r1mvXCtcAMATffUSW2FIW5F7XzWOx8JWmNzyee4r4GZe5iEa4uA1Mr7kEyelM06fyalmqIgzMlyp00a5E2NRlOXa1rC8pOOYdQy1L2RlKMRqAw1W/ufaZeWbxdPxvL+Wr9gKQ1MNzK3+ki8DQUqOumctU1P8AmdtvYSJTYlM2Y9i6i2wAJF48hnp0FCFj8k2VLkm1arqem05pj6r0Lbyg2GxCitVYkWyUwP8AUzf0g8Fwini6zCozfLpgkBSQWZiANvWROG0GY1yt1y5F7QOhGbs/Wab4PoFab1MpLVHyjKtzZdNPUmX45JlusfkZZf49Y/ysOF8OSgvy6KBRubG5Y23Yncy1pYYFipJBykdApty942hSa18hNtf5r/YkiiCCAQdDYnxO/wConTyn082ePLe8ozjYfMAjXUhH0v8Amy2Fund9xPOUolHZCLFGKkeINp6lj0yu99w5ffk2U6dNNPO8wXHMPkxNTmHIqDwzDUe94Zz1sfGy1ncUF02h6S2kd3tpJNM3EyruTsPCmCoQpkqcg3hBGuIBDxXdMpcJ3zLrGd0ymwffMc6Texqh1MUZVOpijJdrDLArDLJNXcW2MyPXzM1nGDoZkpUKnLHiMWOEohVjxBKYRTEbpWOVBOCFSA06tMR4piOWOjGjRTE2XwMgsBz+f7dhZkBNf8DDUH/ri/TuKP3lY9sPkesZ+427JeoQATlFyw0y9TflJS4ZrDMcoNzlFibA6f8AMlLTtsBdvQnQ7H+ukicVdrqo1BOgGzG8V39psmN3rdqJWwiHa7EbC4IB6358tIJ8KpDDIGABBULcevWXOF4S2hqED+VeR8T7Swp4PTLeyjSw0vCa+oOGV7uv6jzzivDnUk06WdKi7BR2WXsmw56AbdYDCcPrUaSVGpq/YqUsgcB0DOzK2+veM9CbhOXRW7N7gMM367zqcIQ6v2zyBsFHp9iK44+6vHzeWSY66ec4f4cr2dmLUjVIbIgDjLYWuQRr4Xml4UnyqaU1UgICO2CHudyTzvNR+FA0sPbnOLRF+7p5DQwk10rK3Lu1Wpib6nw2s2lx7R9RtAQeluQaxtsdhttJVXCKbleybk9AZXYlsoy8+YIBFxre3oDHtnd4+7dxA48AKtM8qiOhP8wF0/Vx6zz74hN8R/oX9WnoPGu0lN/8lWnt0fMn+8Tzzj/+Mvig/wDo/wBZeV/Fh45r5F/uKiqdZNw+wkGtvJ+H2Ewr0IsKAjjG0Y8xKcBjWM7GNEETHHsmU+C7xlvju7KfA94yp0m9nVTqYo2qdTFGS/WGWCWFWSar4xsZkpq+MnQzKSoVOWPEYseJRHCPWDEeDEYqwiQKmFQwA6x8GpjrwM9ZrvgcajwrofcLMis1Xwg1lfwqKf8A1EvDtzfKuvHb/cem13GYeVzuLgZtPHfaPpUblWtY37N7dkSMnbe3LVfID7Mu8Ouo05RX3Txn2MDp7Rr1VUXLKLb87SPxSrlSwIDEi15Tph3YdpjkvfVufXx5zLPy8bxk3XT4/DynLK6i8TEqwBzAg6DneSQo3/4mdTCX3PZHQew+kt+H4tSMt+14/fhFj5LbrKaPPxSTeN2lkWkOs9jqbSW50lBxQN8xWN8gFz015/pNp7rlzy4y3W1ujXG8r+NUgUZgO0ljfnlvrH4Ak3t3eXS1uULj1ujKbdpWH0hTxu5LZ2y+JObDVBrcLnHXTtD6iYX4i76N1DjTbe82170qi/8AS/Y/1mK40t0R+edQT4FL2ld47c0vHzyX9KGpvLHD7CVz7yyobCZV6ETqMeYyjHmSo2MaPjDEEPH92VWAGplpxHuys4fzlTpN7BrHtHzijKx7R84pRNMI9DGx6CQap4ydDMpNTxrYzKy8Spyx4MYscIyPBnQY0TogYqmEQwSwiwCQpjgYJTHgxAYGaj4Wfs1F/wCxx1J1B/QTJgy/+Gq9qgUfnRhbe5Fm/wBplY3Vjn+TN+Kx6twlsz5tLWv5XJ5esta1fICwF8v7TO/D9XfqAAPLeaSnT0I5/oYZS+z8VlxxqBWqnsVGUnQgjex12Ht7Q6akAa3GgsbW/aLFJm0JtltaASuysNLlbAW08h4zl3Jl7ehZbjNJRUqM1xYki2UjX1t0gsAe22x1NrX21/ciDr4l30tlX81zYa31vJ2Fpomqi53yoM2vpzjk5ZTXURbxxu+6ZicUcpGWx9MvvIOArs97gaWU5u6On0hnzEk2VQb2zdpxa1+yNLW/WRsJTsXItZjdb+48t5pMrtlljNbXFJsugte/LYyJxGtYC+mvpJFBCbm+x28ecruOEZNdcpDnyU3P0Bmn0zrPINag3AUqPGxA9dZksWhOGYkWyOht01CzWU6wz2RSbKXOou5JBAAPvMbxbiLB6+HRMqFyWzasCbEgW0GvnKmUmOnJfFll5ZlOpVC+8s6OwlY3ellS2EyrvidRjzGUdo8yVGmMMeYMwCFxI9mVnD9jLDih7Mr+H7GVOk3tFrHtHzijKx7R84pSWtM6riU2J4kFNryOeLDrJ0raTxprgzMZDLLF48NIXzBKhUMKY7LHBxHZxGRoWICPDiODiI3FEIs4GEerCAIR4MQYRwIgCDSZwzFCnUSoQSqEkgbkEEH9ZFFo9EvoLknQAC5J6COUZYzKWX7eqcAxSnJUS5R8tj1JF7Dy2mzo1b2I1vyvax6WmD+H+DPQw3bzFifmMlwwRjplW3h9SZqMG7KiOpLgkAjlbYsekfu39sMcZhNTqJWMqFTsovzJufYevtC0KCtrdmOui9m2p5whTP3tBqRbQjxuJIVcosBbyHidZn/j/K2t75bxknpCTBFWzZVBvuRmI8Bfz3kwq35nPkLAAdfKdfXw+9hBs9tOfgd5eOMxmozyyuV3Qnpjfz3Avb0+9YKjTCsTcaagEWGx29pIy3ta/mQbHxjXGhHUW6fZ1hqDds0VKoQtyN7nQ35yrxNcuj5ly2zC3hb6yzdgPTT+0g41AyNyYghTzBIOvkN/SCdXcu2YwC21vdwoGTZ8jXyEH70lJ8WcJSitJiw+e4b5ijXML3zeQ28bzmI+Ijhi7qM1Srm+WLDKiLdUY9dhp5zOVeIvWZqlVy7tuT05ADkIrWmE1EYjtS1pLoJUioM0s6VYaSa0iwp7RxMZTOk6ZKjTGGOMHeBK/ip7Mg4DumTOLHsyFgu6ZU6Te1fWPaPnFGVj2j5xS0FiUzVLScnDLiRk1rGajDDsyMrpeM2oDwqNPCvCaXLEUi5U9MyeFeEb/C5qCg6RLTHSHIuLL/ws+MX8LPjNUKQ6R3yh0hyPTJHhreM4OHP1M1r0V6RJQXpDkOLJ/gH6mc/BvNf+HXpGnDL0hyHFkvwzyx4E7U8RSdkVwHQWa9hdgM2nMXvLl8MsYlMI6Pa+R0e218rA2+kJkXF6vh1IGVglrckIA8e9adSnkc2BOYXtre/M2J56bdJC4diqmJT5lJkoUzmAd8r1RYkGy7LtzPpB/wAVw4cYcVS9U3bMSWdmXUvcc9Dp0Bmm2VxaGnUvY3v9+enlJanb79Zn6HEB+a/g9tG87S0w2KB1uPM/qfaUmJj/AH98jB5vfn08oP5v3v7zjN/xJM936+N9P1kZ338Pcfdo9qv31/tIrPf9b/uPfaAJj9/sJXcWxAVHPJVYJbm5Fv7epk5wbad5rgeHiekyvxbjclMoh7TaL1AB73nfWBvNuI1c9RzmJAJVT/KNBbwkdNBuZaJgvCcfB25SdxrpWZNdzC0axB1Mk/hvCcfA+Bh6L2lpxEAbxw4mvUSgx+HK7EwOEw7tzMNQcr00n8RXwnP4gvhKU4B+pg2wT9TFqHupvE8YCIDDYgBDIWIwrW1JkVEbUcpWppNvsSrVFzFIrUzFLTta0f8AFP3zmpw/dmXw/wDimanDjSY5NMRBBVyYYTpQHeQtASq17XkpXJjjhljwglbLVOpm8fGqto4yTNeOWMaOXaMHXg6j2j4Ool4BHOKF7WnTVEC+GN7xwoGP0Xt1XP5SVvvYkXHpB0ajI61ENnpsHU+IN9fCEWmROMsNlp6Zw7FUqqBwt0qWdRbVL7jzBBHpJhwrLrTbMOjaETzjgfF2wzm4L0n0dOn8y+P9J6DgOIoy/MRsyflcWIt0YcjNeUrHjYkJiT4qRyJNwdfu0J8739PHTzjHxCPazLfkQbkeHjIdbEqunPY9OUR6TWq/v5f2iRwL3Pmf3IlNV4iBzFuZldieOouhce4vFscWgxWNFjlF9LA3A06XP1M8+4zis72uGykliO7m5KPIfUmH4n8SF7rTBFxYNtbx8PvWU9ERWrxxHQzrnScWKptJWEm8kESMm8kEwCr4nQzbTvDsLl5SwKg7wVV8u0Nlr7EyjpBsg6QSYk21gnxRvDQ3AuIoAu0qsMosZPx9QldZAw2xlTpN7Qqu5ijKp1MUtCVTqWqEy8p4+wteZym3bMlNJsXKuxxHxklMbeZ1KRk+iknifKrj8XOjFSst4xDzhxHKrUYoTv4kSs16xG/WLie1i+JEcmKW0qHYwDl4aG2g/Er1i+cvWZc4hwZJo4kmHEuS/wA46zocdZTiqZ35xj4ntaEiNMrTXMZ+IMNDayZdJ3DYh6ZvTd0PPKxAPmOcrvxJ6xDEw1RuL1+L4g6Fwep+Wlz56SM+LrHeq/oco+krfxU7+LgPSUwZu8zN/wBzEziUh0kcYqdGLh7HpMFMdI8CRBjIvxgi0NxMBnKh0kVcWJx8ULQ0exEOskEyvTEC8OcUIaLY4MZUpgwYxKxHELGbgogQLYYX3hjXXrGfOHWBekHiK2WQMP3TJnFKgI3kGk1lMc6Te1fUOpig3OpnZaBmWzXhadTWdigadTeEFeKKSZ4xE6K8UURnrXnfnCKKAJHvJ9GkCNZyKKnEHHYcDWVyVLGKKOJqwR7iPzRRRmRjSIooBy05aKKALJFkiigHPlxfLnYoBz5cd8rxnIoB1aJ6wi4YmKKAEGCMY+HI5xRQABVhzjCTFFAGkmDNQzsUCR612gyNLRRRkj/JiiijD//Z",
    },
    {
      name: "Baby Products",
      description: ["Baby Wash", "Epizone E", "Panado", "Wet Wipes"],
    },
    {
      name: "Full Cream Long Life Milk",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRipvzbt7TgTnH2lHkT4ikRJ21dwYnZ-C8PUw&usqp=CAU",
    },
    {
      name: "Vouchers from:",
      description: ["Baby City", "BabyBoom", "Dis-chem", "Pick n pay"],
    },
    {
      name: "Lactogen 1 & 2",
      img: "https://www.publicdomainpictures.net/pictures/290000/nahled/baby-formula-1546523832lRP.jpg",
    },

    {
      name: "Wet Wipes",
      img: "data:image/jpeg;base64,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",
    },

    {
      name: "Clothing for:",
      description: ["Girls or Boys", "Premature", "New Born", "Ages 0-5 years"],
    },

    {
      name: "Cleaning Products",
      description: ["Detol", "Dish liquid", "Handy Andy", "Detergent"],
    },
  ];

  /* JSX */
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
          backgroundImage: `url(https://c.pxhere.com/photos/6d/65/girl_child_toddler_baby_young_pink_polka_dots-386126.jpg!d)`,
        }}
      >
        <div
          className="card-body text-center text-white pt-5"
          style={{ background: "#0000002a", height: "100%" }}
        >
          <h1 className=" display-1 fw-bold my-5">Donate</h1>
        </div>
      </div>

      <div className="card ">
        <div className="row g-0">
          <div className="col-md-8">
            <img
              src="https://post.medicalnewstoday.com/wp-content/uploads/2020/08/black_parent_and_child_holding_hands_closeup-1200x628-facebook-1200x628.jpg"
              className="img-fluid "
              alt="..."
            />
          </div>
          <div className="col-md-4">
            <div className="card-body text-center my-5">
              <h5 className="card-title mt-5">We give either way...</h5>
              <p className="card-text">
                We all know babies are helpless: Eat; Sleep; Cry; Repeat! The
                parent does everything for that infant: feed, comfort, carry,
                rock, bath, dress, etc. The baby may give smiles or tears in
                return, but as parents we give either way. Despite our child’s
                complete vulnerability, we don’t feel sorry for him or her
                because all they need is provided for by us.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card  ">
        <div className="row g-0">
          <div className="col-md-4">
            <div className="card-body text-center my-5">
              <h5 className="card-title mt-5">Bringing Joy...</h5>
              <p className="card-text">
                At Thabisa our children are equally as helpless but they are
                without natural parents. We need help to stand in this gap and
                provide for these children. From the experience of holding the
                first babies of this house, I understand “Bringing Joy” in a new
                way. Yes, food and shelter and love bring hope to those babies
                which they were without, but it is they who bring joy to us. “He
                who has pity on the poor lends to the Lord, And He will pay back
                what he has given”, Proverbs 19:17.
              </p>
            </div>
          </div>
          <div className="col-md-8">
            <img
              src="https://p1.pxfuel.com/preview/700/927/770/baby-feet-children-small-tear-black-and-white.jpg"
              className="img-fluid "
              alt="..."
            />
          </div>
        </div>
      </div>
      <div
        className="card-body text-center text-white py-5 bg-dark"
        style={{ height: "100%" }}
      >
        <h1 className=" display-3 fw-bold my-5 text-capitalize">
          see what you can donate...
        </h1>
        <div className="card-body text-center mx-2 py-5 bg-light text-dark">
          <h5 className="card-title mt-5 fw-bolder">
            All donations can be mailed of dropped off at:
          </h5>
          <p className="card-text text-secondary fw-bold">
            120 Nerine Rd, Roodekop, Germiston, 1401
          </p>
        </div>
      </div>
      <div
        className="row row-cols-1 row-cols-md-4 g-4 p-2"
        style={{ background: "#ba93bd" }}
      >
        {donations.map((donation, index) => (
          <div key={index} className="col">
            <div className="card bg-dark text-white">
              {donation.img ? (
                <img
                  src={donation.img}
                  className="card-img"
                  alt={donation.name}
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
                <h5 className="card-title  text-center">{donation.name}</h5>
                {donation.description ? (
                  <div className="row">
                    {donation.description.map((description) => (
                      <div className="col-md-6">
                        <p className="card-text">{description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card ">
        <div className="row g-0">
          <div className="col-md-8">
            <img
              src="https://post.medicalnewstoday.com/wp-content/uploads/2020/08/black_parent_and_child_holding_hands_closeup-1200x628-facebook-1200x628.jpg"
              className="img-fluid "
              alt="Parent holding baby's hand"
            />
          </div>
          <div className="col-md-4">
            <div className="card-body text-center my-5">
              <h5 className="card-title mt-5">Donate your time...</h5>
              <p className="card-text">
                We need all the help we can get. If you would like to know how
                you could donate your time to the baby house click on the button
                below.
              </p>
              <Link href="/enlist">
              <a
                
                className="btn btn-dark "
                style={{ background: "#b82ec1", color: "white" }}
              >
                Learn More
              </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="parent"
        style={{
          padding: "-20%",
          width: "100%",
          height: "100%",

          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundImage: `url(https://p1.pxfuel.com/preview/142/273/216/child-infant-kid-walking.jpg)`,
        }}
      >
        <div
          className="card-body text-center text-white pt-5"
          style={{ background: "#0000002a", height: "100%" }}
        >
          <h1 className=" display-3 fw-bold my-5 text-capitalize">
            we greatly appreciate funds too...
          </h1>
        </div>
      </div>
      <div className="row mx-5 my-5" >
        <div className="col-md-8  my-3">
          <h2 className="text-capitalize">Thank you for your contribution</h2>
          <p className="text-dark">
            Donations can be made through entering an amount on the right or if
            you you prefer to make an online payment, please feel free to use
            our banking details below...
          </p>
          <div className="card-body mx-5">
            <div className="mx-1">
              <div className="row ">
                <div className="col bg-secondary mb-1 text-white ">
                  <p className="card-text">
                    <strong className="text-capitalize">Account Name: </strong>
                  </p>
                </div>
                <div className="col bg-light mb-1">
                  <p className="card-text">Thabisa Baby House</p>
                </div>
              </div>
              <div className="row">
                <div className="col bg-secondary mb-1 text-white ">
                  <p className="card-text">
                    <strong className="text-capitalize">Bank: </strong>
                  </p>
                </div>
                <div className="col bg-light mb-1">
                  <p className="card-text">Nedbank</p>
                </div>
              </div>
              <div className="row">
                <div className="col bg-secondary mb-1 text-white ">
                  <p className="card-text">
                    <strong className="text-capitalize">
                      Account Number:{" "}
                    </strong>
                  </p>
                </div>
                <div className="col bg-light mb-1">
                  <p className="card-text">1148205500</p>
                </div>
              </div>
              <div className="row">
                <div className="col bg-secondary mb-1 text-white ">
                  <p className="card-text">
                    <strong className="text-capitalize">Branch Code: </strong>
                  </p>
                </div>
                <div className="col bg-light mb-1">
                  <p className="card-text">190242</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-secondary my-5">
          <form onSubmit={handleSubmit}>
          {!payOnline ? (
            <>
            <label htmlFor="total mt-5">Please Enter An Amount $:</label>
            <input
              type="number"
              name="total"
              id="total"
              className="form-control  "
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
            />
            
              <div className="mt-4">
                <button className="btn btn-success">Pay Now</button>
              </div>
              </>
            ) : (
              <div className="mt-4">
                <h5 className="text-dark my-4">Amount : ${total}</h5>
                <PayPalDonate total={total} />
                <span className="badge bg-success" onClick={() => setPayOnline(false)} style={{ cursor: 'pointer'}}>Change Amount</span>
              </div>
            )}
          </form>
        </div>
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

export default Donate;
