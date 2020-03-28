import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Form,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import API from "../api";
import {
  updateUsername,
  updatePassword,
  updateUserType
} from "../actions/userActions";

export class LoginView extends Component {
  handleSignUp = () => {
    API.post(`http://localhost:5000/api/post/${this.props.userType}todb`, {
      username: this.props.username,
      password: this.props.password
    }).then(res => {
      console.log(res.statusText);
      if (!res.statusText.equals("OK")) {
        // TODO CHECK "OK" or NOT
        alert("This username already exists!");
      }
    });
  };
  handleUsernameChange = event => {
    this.props.handleUsernameChange(event.target.value);
  };
  handlePasswordChange = event => {
    this.props.handlePasswordChange(event.target.value);
  };
  handleTypeChange = event => {
    this.props.handleTypeChange(event);
    console.log(this.props.userType);
  };
  render() {
    return (
      <Container className="container-sm" style={{ marginTop: "50px" }}>
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue={"customer"}
          onChange={this.handleTypeChange}
        >
          <ToggleButton value={"customer"} variant="outline-dark">
            Customer
          </ToggleButton>
          <ToggleButton value={"restaurant"} variant="outline-dark">
            Restaurant
          </ToggleButton>
          <ToggleButton value={"rider"} variant="outline-dark">
            Rider
          </ToggleButton>
          <ToggleButton value={"manager"} variant="outline-dark">
            Manager
          </ToggleButton>
        </ToggleButtonGroup>
        <br />
        <br />
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              onChange={this.handleUsernameChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </Form.Group>
          <Button variant="primary" style={{ marginRight: "10px" }}>
            Sign in
          </Button>
          <Button variant="secondary" onClick={this.handleSignUp}>
            Sign up
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  password: state.user.password,
  userType: state.user.userType
});

const mapDispatchToProps = dispatch => {
  return {
    handleUsernameChange: username => {
      dispatch(updateUsername(username));
    },
    handlePasswordChange: password => {
      dispatch(updatePassword(password));
    },
    handleTypeChange: type => {
      dispatch(updateUserType(type));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);