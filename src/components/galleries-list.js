import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";

const Gallery = (props) => (
  <div>
    <link
      href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />
    {/*---- Include the above in your HEAD tag --------*/}
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"
      rel="stylesheet"
    />
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      rel="stylesheet"
    />

    <div
      className="col-lg-6 col-md-6 col-sm-6 col-xs-12"
      data-aos="fade-right"
      style={{ background: "#c0c0c0" }}
    >
      <br></br>
      <div
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        style={{ background: "white" }}
      >
        <h2 className="post-title">
          <Link to={"/galleries/" + props.gallery._id}>
            {props.gallery.title}
          </Link>
        </h2>
        <br></br>
        <div className="post-image">
          <Link to={"/galleries/" + props.gallery._id}>
            <img src={props.gallery.galleryImage} alt="" width="100%" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default class GalleryList extends Component {
  constructor(props) {
    super(props);
    this.state = { galleries: [] };
  }

  componentDidMount() {
    axios
      .get("https://cryptic-shelf-72177.herokuapp.com/galleries/")
      .then((response) => {
        this.setState({ galleries: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  galleryList() {
    return this.state.galleries.map(function (currentGallery, i) {
      return <Gallery gallery={currentGallery} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <div className="blog">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-lg-offset-3 text-center">
                <h2>
                  <span className="ion-minus" />
                  Image galleries
                  <span className="ion-minus" />
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus{" "}
                </p>
                <br />
              </div>
            </div>
            <div className="row">
              <div
                className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                data-aos="fade-right"
                style={{ background: "red" }}
              >
                {this.galleryList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

{
  /* <div>
  <section>
    <article>
      <div className="box head">
        <a className="box image" href>
          <img src={props.event.eventImage} alt="" />
        </a>

        <h4>
          By <span>Cyndie Sound</span> on <time>Apr 1st, 2015</time>
        </h4>
      </div>
      <h2>
        <a href>{props.event.title}</a>
      </h2>
      <div className="box body">
        <p>{props.event.description}</p>
        <a href className="more">
          Read more
        </a>
      </div>
      <div className="box foot">
        <a href>
          <i className="fa fa-comment-o" /> 120 comments{" "}
        </a>
        <a href>
          <i className="fa fa-share" />
        </a>
      </div>
    </article>
  </section>
</div>; */
}
