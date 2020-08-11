import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, ButtonToolbar } from "react-bootstrap";
import AddComingWithModal from "../components/coming-with-modal.component";

const EventComment = (props) => (
  <div>
    <div className="blog-content">
      <p>{props.eventcomment.description}</p>
      <p>{props.eventcomment.name}</p>
      <a href="" className="more-btn">
        View More
      </a>
    </div>
    <span className="blog-date">{props.eventcomment.createdAt}</span>
  </div>
);

export default class EventAndComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventcomments: [],
      event: "",
      name: "",
      description: "",
      going: "",
      addModalshow: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.event === this.state.event) {
      axios
        .get(
          "http://localhost:9000/events/" +
            this.props.match.params.id +
            "/eventcomments"
        )
        .then((response) => {
          this.setState({ event: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  updateGoing = (going) => {
    axios
      .get(
        "http://localhost:9000/events/" + this.props.match.params.id + "/going"
      )
      .then((response) => {
        this.setState({ event: response.data });
      });
  };

  componentDidMount() {
    axios
      .get(
        "http://localhost:9000/events/" +
          this.props.match.params.id +
          "/eventcomments"
      )
      .then((response) => {
        this.setState({ event: response.data });
        this.setState({ eventcomments: response.data.eventcomments });
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
        "http://localhost:9000/events/" +
          this.props.match.params.id +
          "/eventcomment",
        data
      )
      .then((res) => {
        this.setState({
          name: "",
          description: "",
        });
        this.props.history.push(
          "/events/" + this.props.match.params.id + "/eventcomments"
        );
        console.log("Comment Created");

        axios
          .get(
            "http://localhost:9000/events/" +
              this.props.match.params.id +
              "/eventcomments"
          )
          .then((response) => {
            this.setState({ event: response.data });
            this.setState({ eventcomments: response.data.eventcomments });
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
    const eventcomments = this.state.eventcomments;
    let eventCommentList;

    if (!eventcomments) {
      eventCommentList = "there is no Comment ";
    } else {
      eventCommentList = eventcomments.map((eventcomment, k) => (
        <EventComment eventcomment={eventcomment} key={k} />
      ));
    }

    let addModalClose = () => this.setState({ addModalshow: false });

    let commentLengt =
      eventcomments.length >= 1
        ? eventcomments.length + "Comments"
        : eventcomments.length + "Comment";
    let goingAndComingwith = this.state.event.going
      ? this.state.event.going + this.state.event.coming_with + "Person going"
      : "0";
    return (
      <div className="CreateComment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div>{this.state.event.title}</div>
              <div className="single-blog-item">
                <img
                  src={this.state.event.eventImage}
                  alt="blog-img"
                  style={{ width: "450px", height: "550px" }}
                />
                <div>{this.state.event.description}</div>
                <div>{this.state.event.createdAt}</div>
              </div>
              <br></br>
              <ButtonToolbar>
                <Button
                  variant="primary"
                  onClick={() => {
                    this.updateGoing(this.state.event._id);
                    this.setState({ addModalshow: true });
                  }}
                >
                  Going
                </Button>
                <AddComingWithModal
                  show={this.state.addModalshow}
                  onHide={addModalClose}
                  state={this.state.event._id}
                  history={this.props.history}
                />
              </ButtonToolbar>
              <div>{commentLengt}</div>
              <div>{goingAndComingwith}</div>
              <br></br>
              <hr></hr>
              <div className="list">{eventCommentList}</div>
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
                  <textarea
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
