import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Login.css';
import { authenticate, refreshSession } from '../../actions/authentication';
import { loadTasks } from '../../actions/tasks';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      isRegister: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.props.refreshSession();
  }

  handleSubmit(event) {
    const form = event.type === 'submit' ? event.target : event.target.form;
    const userName = form[0].value;
    const password = form[1].value;

    if (userName && password) {
      event.preventDefault();
      this.props.authenticate({
        credentials: {
          userName,
          password,
        }
      });
    }
  }

  toggleForm() {
    this.setState({
      isRegister: !this.state.isRegister
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.props;
    const { isRegister } = this.state;
    const inputValue = isRegister ? 'create' : 'login';
    const messageQuestion = isRegister ? 'Already' : 'Not';
    const messageValue = isRegister ? 'Sign in' : 'Create an account';

    if (redirectToReferrer === true) {
      return <Redirect to={from}/>
    }

    return (
      <div className="login-container">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="username" required/>
            <input type="password" placeholder="password" required/>
            {isRegister && <input type="text" placeholder="email address" required/>}
            <input type="submit" className="button primary" value={inputValue} onMouseDown={this.handleSubmit}/>
            <p className="message">
              {messageQuestion} registered?
              <span onClick={this.toggleForm}>{messageValue}</span>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  redirectToReferrer: PropTypes.bool,
};

const mapStateToProps = state => ({
  redirectToReferrer: state.auth.redirectToReferrer,
});

const mapDispatchToProps = dispatch => ({
  authenticate: (props) => dispatch(authenticate(props)),
  refreshSession: () => dispatch(refreshSession()),
  loadTasks: () => dispatch(loadTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);