import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import "./App.css";
import CommentComponent from "./components/comment/comment.component";
import PostComponent from "./components/post/post.component";
import Edit from "./components/user/edit.component";
import UserComponent from "./components/user/user.component";

const appEndpoint = process.env.REACT_APP_ENDPOINT || "http://localhost:4000"; // Replace with your GraphQL endpoint
const client = new ApolloClient({
  uri: appEndpoint,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/posts" className="nav-link">
                    Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/comments" className="nav-link">
                    Comments
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />

          <Switch>
            <Route path="/edit/:id" component={Edit} />
            <Route exact path="/posts" component={PostComponent} />
            <Route path="/posts/:id" component={PostComponent} />
            <Route exact path="/comments" component={CommentComponent} />
            <Route path="/comments/:id" component={CommentComponent} />
            <Route path="/" component={UserComponent} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
