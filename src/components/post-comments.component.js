import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostComment = (props) => (
  <div>
    <div className="blog-content">
      <p>{props.comment.description}</p>
      <p>{props.comment.name}</p>
      <a href="" className="more-btn">
        View More
      </a>
    </div>
    <span className="blog-date">{props.comment.createdAt}</span>
  </div>
);

export default class PostAndComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      post: "",
      name: "",
      description: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://cryptic-shelf-72177.herokuapp.com/posts/" +
          this.props.match.params.id +
          "/comments"
      )
      .then((response) => {
        this.setState({ post: response.data });
        this.setState({ comments: response.data.comments });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      description: this.state.description,
    };

    axios
      .post(
        "https://cryptic-shelf-72177.herokuapp.com/posts/" +
          this.props.match.params.id +
          "/comment",
        data
      )
      .then((res) => {
        this.setState({
          name: "",
          description: "",
        });
        this.props.history.push(
          "/posts/" + this.props.match.params.id + "/comments"
        );
        console.log("Comment Created");

        axios
          .get(
            "https://cryptic-shelf-72177.herokuapp.com/posts/" +
              this.props.match.params.id +
              "/comments"
          )
          .then((response) => {
            this.setState({ post: response.data });
            this.setState({ comments: response.data.comments });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log("Error in CreateBook!");
      });
  };

  render() {
    const comments = this.state.comments;
    let commentList;

    if (!comments) {
      commentList = "there is no Comment ";
    } else {
      commentList = comments.map((comment, k) => (
        <PostComment comment={comment} key={k} />
      ));
    }

    return (
      <div className="CreateComment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div>{this.state.post.title}</div>
              <div className="single-blog-item">
                <img
                  src={this.state.post.postImage}
                  alt="blog-img"
                  style={{ width: "450px", height: "550px" }}
                />
                <div>{this.state.post.description}</div>
                <div>{this.state.post.from}</div>
                <div>{this.state.post.createdAt}</div>
              </div>
              <div>{comments.length} Comments</div>
              <div className="list">{commentList}</div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Author"
                    name="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Describe this book"
                    name="description"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
