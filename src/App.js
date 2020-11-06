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
import "./components/homepage.css";
import ProductCard from "./components/product";
import Slider2 from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ContactForm from "./components/contactForm";

import clsx from "clsx";

import Card2 from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import moment from "moment";
import { post } from "jquery";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1200,
    // height: 950,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  root3: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function App(props) {
  const EventLive = (props) => (
    <div>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            LIVE
          </Avatar>
        }
        title={props.live.title}
      />
      <div className="dateevent">
        {props.live
          ? "Started" + " " + moment(props.live.startingDate).format("LLLL")
          : ""}
      </div>
      <div className="dateevent">
        {props.live
          ? "Closing" + " " + moment(props.live.closingDate).format("LLLL")
          : ""}
      </div>
      <CardMedia
        className={classes.media}
        image={props.live ? props.live.eventImage : ""}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.live.description.substring(0, 70)}
        </Typography>
      </CardContent>
    </div>
  );
  const theme = useTheme();

  const [slides, setSlides] = useState([]);
  const [programData, setProgramData] = useState([]);
  const [liveEventData, setLiveEvent] = useState([]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    axios
      .get("https://cryptic-shelf-72177.herokuapp.com/programs")
      .then((response) => {
        setProgramData([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9000/events/")
      .then((response) => {
        setSlides([...response.data]);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://cryptic-shelf-72177.herokuapp.com/events/lives")
      .then((response) => {
        setLiveEvent([...response.data]);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const goingPeople = (going, coming_with) => {
    console.log(going + coming_with);
    if (going + coming_with === 1) {
      return going + coming_with + " Person Going";
    } else if (going === 0) {
      return "No one have signed up yet";
    } else {
      return going + coming_with + " People Going";
    }
  };

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
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const BACKEND_URL = "http://localhost:9000/contact_form/";

  const [values, setValues] = useState({});

  const saveForm = () => {
    const sendAction = fetch(BACKEND_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    sendAction.then(() => {
      alert("thanks");
      setValues({ name: "", email: "", request: "" });
    });
    sendAction.catch((err) => {
      alert(err.message);
    });
  };
  let eventLive = liveEventData.map((live, k) => (
    <EventLive live={live} key={k} />
  ));

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
              <div>
                <Card2
                  // style={{ width: "50vh", height: "53vh" }}
                  className={classes.root3}
                >
                  {eventLive}
                </Card2>
              </div>
            </section>
          </div>
        ))}
      </Slider>
      <div className="sliderclass" style={{ padding: 12 }}>
        <h2 class="d-flex justify-content-center">
          {" "}
          These are the Upcoming Events. Are you coming?
        </h2>
        <Slider2 {...settings}>
          {slides.map((slide, index) => {
            return (
              <div>
                <div
                  className="row"
                  style={{
                    marginLeft: -2,
                  }}
                >
                  <div
                    className="col-12 col-lg-12 col-lg-12 col-lg-12"
                    style={{ backgroundColor: "#CD5C5C" }}
                  >
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
                            height: "200px",
                          }}
                          className="card-img"
                          src={slide.eventImage}
                          alt="Bologna"
                        />
                      </div>
                      {/* <div className="card-img-overlay">
                        <a href="#" className="btn btn-light btn-sm">
                          Cooking
                        </a>
                      </div> */}
                      <div className="card-body">
                        <h4 className="card-title">{slide.title}</h4>
                        <div className="text-center">
                          {" "}
                          <button
                            type="button"
                            class="
                          btn btn-md btn-outline-success py-0 
                          "
                          >
                            {goingPeople(slide.going, slide.coming_with)}
                          </button>
                        </div>

                        <small
                          className="text-muted cat"
                          className="text-center"
                        >
                          <div className="text-center">
                            <i className="far fa-clock text-info" />{" "}
                            <strong>Starting</strong>
                            <span class="startingclass">
                              {" "}
                              {moment(slide.startingDate).format("LLLL")}
                            </span>
                          </div>
                          {/* <i className="fas fa-users text-info" />{" "} */}
                          <div className="views">
                            <strong>Closing</strong>{" "}
                            <span class="ingredient endingclass">
                              {moment(slide.closingDate).format("LLLL")}
                            </span>
                          </div>
                        </small>
                        <p className="card-text text-center">
                          {slide.description.substring(0, 95)}
                        </p>

                        <a href="#" className="btn btn-info btn-lg btn-block">
                          Click here if you want to attend
                        </a>
                      </div>
                      {/* <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                        <div className="views">
                          <strong>Closing</strong>{" "}
                          <span class="ingredient">
                            {moment(slide.closingDate).format("LLLL")}
                          </span>
                        </div>
                        <div className="stats">
                          <i className="far fa-eye" /> 1347
                          <i className="far fa-comment" />{" "}
                          {slide.eventcomments.length}
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider2>
      </div>
      <br></br>
      <br></br>
      <div className={classes.root} style={{ padding: 12 }}>
        <GridList
          cols={matches ? 1 : 3}
          cellHeight={350}
          spacing={15}
          className={classes.gridList}
          style={{ paddingTop: 30 /*background: " #C0392B	",*/ }}
        >
          {/* <GridListTile key="Subheader">
            <ListSubheader component="div">
              These are our different Activities
            </ListSubheader>
          </GridListTile> */}
          {programData.length > 0 &&
            programData.map((tile, index) => {
              return (
                <GridListTile
                  className="shadow"
                  key={Math.floor(Math.random() * new Date().getTime())}
                >
                  <img src={tile.programImage} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}
                    subtitle={<span>by: {tile.author}</span>}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${tile.title}`}
                        className={classes.icon}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              );
            })}
        </GridList>
      </div>
      <div
        className="container center_div"
        style={{ marginTop: 100, backgroundColor: "rgba(255, 0, 0, 0.4)" }}
      >
        {" "}
        <ContactForm
          values={values}
          setValues={setValues}
          onSubmit={saveForm}
        />
      </div>

      <footer>
        <div>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
            integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
            crossOrigin="anonymous"
          />
        </div>
        <div className="container" className="footer-section">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-map-marker-alt" />
                  <div className="cta-text">
                    <h4>Find us</h4>
                    <span>1010 Avenue, sw 54321, chandigarh</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-phone" />
                  <div className="cta-text">
                    <h4>Call us</h4>
                    <span>9876543210 0</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="far fa-envelope-open" />
                  <div className="cta-text">
                    <h4>Mail us</h4>
                    <span>mail@info.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="index.html">
                      <img
                        src="https://i.ibb.co/QDy827D/ak-logo.png"
                        className="img-fluid"
                        alt="logo"
                      />
                    </a>
                  </div>
                  <div className="footer-text">
                    <p>
                      Lorem ipsum dolor sit amet, consec tetur adipisicing elit,
                      sed do eiusmod tempor incididuntut consec tetur
                      adipisicing elit,Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                  <div className="footer-social-icon">
                    <span>Follow us</span>
                    <a href="#">
                      <i className="fab fa-facebook-f facebook-bg" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter twitter-bg" />
                    </a>
                    <a href="#">
                      <i className="fab fa-google-plus-g google-bg" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">about</a>
                    </li>
                    <li>
                      <a href="#">services</a>
                    </li>
                    <li>
                      <a href="#">portfolio</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Our Services</a>
                    </li>
                    <li>
                      <a href="#">Expert Team</a>
                    </li>
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                    <li>
                      <a href="#">Latest News</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Subscribe</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill the
                      form below.
                    </p>
                  </div>
                  <div className="subscribe-form">
                    <form action="#">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <i className="fab fa-telegram-plane" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
}
