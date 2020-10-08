import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import PostsList from "./components/posts-list.component";
import PostAndComments from "./components/post-comments.component";
import EventsList from "./components/events-list.component";
import EventAndComments from "./components/event-comments.component";
import GalleryList from "./components/galleries-list";
import Program from "./components/programs";
import ProgramComments from "./components/program-comments";
import Slider from "react-animated-slider";
import image1 from "./images/one.jpg";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./components/homepage-slider.css";
import ProductCard from "./components/product";
import Slider2 from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "react-bootstrap";

const App = (props) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios
      .get("https://cryptic-shelf-72177.herokuapp.com/posts")
      .then((response) => {
        setSlides([...response.data]);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      // {
      //   breakpoint: 1200,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2,
      //     infinite: true,
      //     dots: true,
      //   },
      // },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const content = [
    {
      title: "Vulputate Mollis Ultricies Fermentum Parturient",
      description:
        "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
      button: "Read More",
      image: image1,
      user: "Luan Gjokaj",
      userProfile: "https://i.imgur.com/JSW6mEk.png",
    },
    {
      title: "Tortor Dapibus Commodo Aenean Quam",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
      button: "Discover",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM5SzNAznPKGcAhoBTQ8ULKCJ20S2ZOE_NxQ&usqp=CAU",
      user: "Erich Behrens",
      userProfile: "https://i.imgur.com/0Clfnu7.png",
    },
    {
      title: "Phasellus volutpat metus",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
      button: "Buy now",
      image: "https://i.imgur.com/DvmN8Hx.jpg",
      user: "Bruno Vizovskyy",
      userProfile: "https://i.imgur.com/4KeKvtH.png",
    },
  ];

  return (
    <Router>
      <header className="header">
        <a href className="logo">
          <img
            src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg"
            className="logoimage"
          />
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon" />
        </label>
        <ul className="menu">
          <li className="contactme">
            <a href="#work">Contact Me</a>
          </li>
          <li className="aboutme">
            <a href="#about">About Me</a>
          </li>
          <li className="projects">
            <a href="#careers">Projects</a>
          </li>
          <li className="Home">
            <a href="#contact" className="Home">
              Home
            </a>
          </li>
        </ul>
      </header>
      <Slider className="slider-wrapper" autoplay={3000} infinite="true">
        {content.map((item, index) => (
          <div
            key={index}
            className="slider-content"
            style={{
              background: `url('${item.image}') no-repeat center center`,
            }}
          >
            <div className="inner">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <button>{item.button}</button>
            </div>
            <section>
              <img src={item.userProfile} alt={item.user} />
              <span>
                Posted by <strong>{item.user}</strong>
              </span>
            </section>
          </div>
        ))}
      </Slider>
      <div>
        <h2> Don't miss these hotel + flight deals</h2>
        <Slider2 {...settings}>
          {slides.map((slide, index) => {
            return (
              <div className="container">
                <div
                  className="row"
                  style={{ marginLeft: -17, marginRight: -40 }}
                >
                  <div className="col-12 col-lg-12 col-lg-12 col-lg-12">
                    <div className="card" style={{ marginLeft: 0 }}>
                      <div
                        style={{
                          position: "relative",
                          height: "250px",
                          width: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          style={{
                            objectFit: "cover",
                            height: "300px",
                          }}
                          className="card-img"
                          src={slide.postImage}
                          alt="Bologna"
                        />
                      </div>
                      <div className="card-img-overlay">
                        <a href="#" className="btn btn-light btn-sm">
                          Cooking
                        </a>
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">{slide.title}</h4>
                        <small className="text-muted cat">
                          <i className="far fa-clock text-info" /> 30 minutes
                          <i className="fas fa-users text-info" /> 4 portions
                        </small>
                        <p className="card-text">
                          {slide.description.substring(0, 100)}
                        </p>
                        <a href="#" className="btn btn-info">
                          Read Recipe
                        </a>
                      </div>
                      <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                        <div className="views">Oct 20, 12:45PM</div>
                        <div className="stats">
                          <i className="far fa-eye" /> 1347
                          <i className="far fa-comment" /> 12
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider2>
      </div>
      <Route path="/posts" exact component={PostsList} />
      <Route path="/events" exact component={EventsList} />
      <Route path="/programs" exact component={Program} />
      <Route path="/galleries" exact component={GalleryList} />
      <Route path="/posts/:id/comments" exact component={PostAndComments} />
      <Route
        path="/programs/:id/programcomments"
        exact
        component={ProgramComments}
      />
      <Route
        path="/events/:id/eventcomments"
        exact
        component={EventAndComments}
      />
    </Router>
  );
};

export default App;
