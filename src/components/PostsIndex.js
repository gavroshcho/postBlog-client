import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requireAuth from 'components/requireAuth';
import * as actions from 'actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPost() {
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul style={{listStyleType: "none" }}>
          {this.renderPost()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, actions)(requireAuth(PostsIndex));