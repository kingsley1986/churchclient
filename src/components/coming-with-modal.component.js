import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import EventAndComments from "../components/event-comments.component";

export default class AddComingWithModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coming_with: "",
    };
  }

  onItemClick = (event) => {
    document.querySelector("#my_with").style.display = "block";
    document.querySelector(".columnContainer").style.display = "none";

    var myArray = ["1", "2", "3", "4", "5"];
    // Get dropdown element from DOM
    var dropdown = document.getElementById("chooseNumber");

    // Loop through the array
    for (var i = 0; i < myArray.length; ++i) {
      // Append the element to the end of Array list
      dropdown[dropdown.length] = new Option(myArray[i], myArray[i]);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    document.querySelector("#my_with").style.display = "none";
    document.querySelector(".coming_with_someone").style.display = "none";
    document.querySelector(".containerthanks").style.display = "block";

    const data = {
      coming_with: this.state.coming_with,
    };

    axios
      .post(
        "http://localhost:9000/events/" + this.props.state + "/coming_with",
        data
      )
      .then((res) => {
        this.setState({
          coming_with: "",
        });
        this.props.history.push(
          "/events/" + this.props.state + "/eventcomments"
        );
        console.log("Comment coming with Created");
      })
      .catch((err) => {
        console.log("Error in CreateBook!");
      });
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thank you for Coming. God Bless you
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="containerthanks" style={{ display: "none" }}>
            Thank you for bringing someone, please close
          </div>
          <div className="coming_with_someone" style={{ textAlign: "center" }}>
            Are you coming with Somone?
          </div>

          <div className="columnContainer" style={{ textAlign: "center" }}>
            <button
              onClick={this.onItemClick}
              type="button"
              id="yes"
              className="btn btn-success mr-3 col-md-5 col-md-offset-1"
            >
              Yes
            </button>
            <button
              type="button"
              id="no"
              className="btn btn-info col-md-5 col-md-offset-1"
            >
              No
            </button>
          </div>

          <form noValidate onSubmit={this.onSubmit} id="my_with">
            <div className="form-group">
              <select
                name="coming_with"
                id="chooseNumber"
                className="form-control"
                value={this.state.coming_with}
                onChange={this.onChange}
              >
                <option>Choose a number</option>
              </select>
            </div>
            <button
              className="btn btn-success"
              id="send_coming_with"
              type="submit"
            >
              send
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
