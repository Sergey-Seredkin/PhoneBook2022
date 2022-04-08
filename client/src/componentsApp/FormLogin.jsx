import React, { Component } from "react";
//import LoginOk from './LoginOk';

class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      mail: "",
      submitting: true,
      log: true,
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  //sendBackData = () => {this.props.visibleToggleModal(this.state.log)};
  sendBackData = (res) => {
    this.props.visibleToggleModal(res);
  }; //метод меняет состояние перключателя МО

  handleUserChange = (e) => {
    this.setState({ username: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleEmailChange = (e) => {
    this.setState({ mail: e.target.value });
  };

  validateFilds = (e) => {
    const errors = {};
    if (this.state.username === "") {
      errors.username = "Not empty";
    }
    return errors;
  };

  handleBlur = () => {
    console.log("on blur");
    const errors = this.validateFilds();
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, ...errors },
      }));
    }
  };

  onLogin = (e) => {
    e.preventDefault();
    //const logiCheck  = this.onSubmit();
    this.onSubmit();
    //console.log(logiCheck);
    // console.log(this.state.password);
    // console.log(this.state.mail);
    // console.log(this.state.username)
  };

  onSubmit = async () => {
    console.log(this.state.password);
    const mail = this.state.mail;
    const username = this.state.username;
    const password = this.state.password;

    const apiResp = await fetch(
      `http://localhost:3001/api/getUser/${username}/${mail}/${password}`
    )
      .then((response) => {
        return response.text();
      })
      .catch((errors) => {
        return console.error;
      });

    if (apiResp === "Yes") {
      this.sendBackData(true);
      //console.log("вошли in FormLogin");
    } else {
      //console.log("нет входа");
      this.sendBackData(false);
    }
    // console.log(this.state.login);
    return apiResp;
  };

  render() {
    // const{username, password, errors,submitting} = this.setState;
    const submitting = this.state.submitting;

    return (
      <div>
        {submitting ? (
          <div className="form-login-container">
            <form className="form-login">
              <h1 className="h5 mb-4 font-weight-normal text-center">
                Authorization
              </h1>
              <div className="form-group">
                <label htmlFor="inputEmail" className="sr-only">
                  E-mail
                </label>
                <input
                  type="email"
                  onChange={this.handleEmailChange}
                  id="inputEmail"
                  className="form-control"
                  placeholder="email"
                  autoComplete="on"
                 //required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputUserName" className="sr-only">
                  User
                </label>
                <input
                  type="text"
                  onChange={this.handleUserChange}
                  id="inputUserName"
                  className="form-control"
                  placeholder="UserName"
                  autoComplete="inputUserName"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  onChange={this.handlePasswordChange}
                  id="inputUsername"
                  className="form-control"
                  placeholder="Password"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label style={{ fontFamily: "Arial Black" }}>
                  fill in the data!
                </label>
              </div>
              <button
                style={{ width: "auto" }}
                type="submit"
                className="btn btn-primary btn-lg "
                //<button type="button" className="btn btn-danger">Danger</button>
                onClick={this.onLogin}
                disabled={this.submitting}
              >
                Sign in phone book.
              </button>
            </form>
          </div>
        ) : (
          <div>Autorization successfully</div>
        )}
      </div>
    );
  }
}
export default FormLogin;
