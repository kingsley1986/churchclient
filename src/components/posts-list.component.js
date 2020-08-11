import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";

const Post = (props) => (
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
          <Link to={"/posts/" + props.post._id + "/comments"}>
            {props.post.title}
          </Link>
        </h2>
        <br></br>
        <div className="post-image">
          <Link to={"/posts/" + props.post._id + "/comments"}>
            <img src={props.post.postImage} alt="" width="100%" />
          </Link>
        </div>
        <div className="post-description">
          {props.post.description.substring(0, 300)}
        </div>
        <a href="#">Read More</a>
        <div className="col-lg-12 col-xs-12">
          <div className="blog-column">
            <ul className="blog-detail list-inline">
              <br></br>
              <li>
                from: <i className="fa fa-user" /> {props.post.from}{" "}
                <span>
                  <i className="fa fa-clock-o" />
                </span>{" "}
                <ReactTimeAgo date={props.post.createdAt} />{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/posts/")
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  postList() {
    return this.state.posts.map(function (currentPost, i) {
      return <Post post={currentPost} key={i} />;
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
                  Blog Posts
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
                {this.postList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
