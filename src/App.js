import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

class App extends Component {
  render() {
    const content = [
      {
        title: "Vulputate Mollis Ultricies Fermentum Parturient",
        description:
          "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
        button: "Read More",
        image:
          "https://www.ogscapital.com/wp-content/uploads/2016/10/church-business-plan.jpg",
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
    );
  }
}

export default App;
