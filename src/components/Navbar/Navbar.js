import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../../actions/authentication';
import './Navbar.css';

class Navbar extends Component {
  handleLogOut = () => {
    this.props.signOut();
  };

  render() {
    const { userName, isAuthenticated } = this.props;

    return (
      isAuthenticated &&
      <nav className="navbar">
        <div className="navbar-container">
          <span className="title">Tasks</span>
          <div className="sign-out-container">
            {userName && <span>Hi {userName}!</span>}
            <button className="sign-out secondary" onClick={this.handleLogOut}>log out</button>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  userName: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = ({ tasks, auth }) => ({
  userName: auth.credentials.userName,
  isAuthenticated: auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);