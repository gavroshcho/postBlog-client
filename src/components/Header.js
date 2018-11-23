import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to='/posts'>Posts</Link>
          <Link to='/sign_out'>Sign Out</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to='/sign_up'>Sign Up</Link>
          <Link to='/sign_in'>Sign In</Link>
        </div>
      );  
    }
  }

  render() {
    return (
      <div>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);