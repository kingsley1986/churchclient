import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBMask,
  MDBIcon,
  MDBView,
  MDBBtn,
} from "mdbreact";

const PostComment = (props) => (
  <MDBCard style={{ width: "auto", marginTop: "1rem" }} className="text-center">
    <MDBCardHeader
      style={{
        backgroundColor: "#00c851",
        color: "white",
        textAlign: "center",
        fontWeight: "bolder",
      }}
    >
      Thank you for commenting. God bless you
    </MDBCardHeader>
    <MDBCardBody>
      <MDBCardTitle>{props.comment.name}</MDBCardTitle>
      <MDBCardText>{props.comment.description}</MDBCardText>
    </MDBCardBody>
    <MDBCardFooter
      style={{
        backgroundColor: "#4285f4",
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {moment(props.comment.createdAt).format("LLLL")}
    </MDBCardFooter>
  </MDBCard>
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
      <MDBCard className="my-5 px-5 pb-5">
        <MDBCardBody>
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            Recent posts
          </h2>
          <p className="text-center w-responsive mx-auto mb-5">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <MDBRow>
            <MDBCol lg="8">
              <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                <img
                  className="img-fluid"
                  src={this.state.post.postImage}
                  alt=""
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
            </MDBCol>
            <MDBCol lg="7">
              <a href="#!" className="green-text">
                <h6 className="font-weight-bold mb-3">
                  <MDBIcon icon="utensils" className="pr-2" />
                  Food
                </h6>
              </a>
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>{this.state.post.title}</strong>
              </h3>
              <p>{this.state.post.description}</p>
              <p>
                by
                <a href="#!">
                  <strong>Carine Fox</strong>
                </a>
                , 19/08/2018
              </p>
              <MDBBtn color="success" size="md" className="waves-light ">
                <div>{comments.length} Comments</div>
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <hr className="my-5" />
        </MDBCardBody>
        <MDBContainer>{commentList}</MDBContainer>

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

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
              </span>
            </div>

            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="Write your Comments here"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            ></textarea>
          </div>

          <input
            type="submit"
            className="btn btn-outline-warning btn-block mt-4"
          />
        </form>
      </MDBCard>
    );
  }
}
