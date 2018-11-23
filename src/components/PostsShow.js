import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requireAuth from 'components/requireAuth';
import * as actions from 'actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        <Link to="/posts">Back To Index</Link>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, actions)(requireAuth(PostsShow));