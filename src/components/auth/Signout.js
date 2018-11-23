import React, { Component } from 'react';
import { connect } from 'react-redux';
import Welcome from 'components/Welcome';
import * as actions from 'actions';

class Signout extends Component {
  componentDidMount() {
    this.props.signout(function() {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        <Welcome />
      </div>
    );
  }
}

export default connect(null, actions)(Signout);