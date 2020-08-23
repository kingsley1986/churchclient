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

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light big-light">
            <a className="navbar-brand" href="/" target="_blank">
              {/* <img src={logo} width="30" height="30" alt="/" /> */}
            </a>

            <Link to="/" className="navbar-brand">
              Mern-stack To do App
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/posts" className="nav-link">
                    Posts
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/events" className="nav-link">
                    Events
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/galleries" className="nav-link">
                    Image Gallery
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/programs" className="nav-link">
                    {" "}
                    programs
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
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
        </div>
      </Router>
    );
  }
}

export default App;
