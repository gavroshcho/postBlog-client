import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';


class Signup extends Component {

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }


  onSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label>Email</label>
            <Field
              name='email'
              type='text'
              component={this.renderField}
              autoComplete='none'
            />
          </fieldset>
          <fieldset>
            <label>Password</label>
            <Field
              name='password'
              type='password'
              component={this.renderField}
              autoComplete='none'
            />
          </fieldset>
          <fieldset>
            <label>Password Confirmation</label>
            <Field
              name='password_confirmation'
              type='password'
              component={this.renderField}
              autoComplete='none'
            />
          </fieldset>
          <button>Sign Up</button>
          <div>{this.props.errorMessage}</div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

function validate(values) {
  const errors = {};

  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Password confirmation and password are different';
  }

  return errors;
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup", validate })
)(Signup);
