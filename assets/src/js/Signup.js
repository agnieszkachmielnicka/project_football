import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
            values.userName,
            values.firstName,
            values.secondName,
            values.email,
            values.age,
            values.password,
            values.confirm
        );
        this.props.history.push('/');
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          
          <FormItem>
              {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
              })(
                  <div className="input-field col s12">
                      <i class="material-icons prefix">account_circle</i>
                      <Input id="login-input"/>
                      <label className="active" for="login-input">Username</label>
                  </div>
              )}
          </FormItem>

          <FormItem>
              {getFieldDecorator('firstName', {
                  rules: [{ required: true, message: 'Please input your first name!' }],
              })(
                  <div class="input-field col s6">
                      <i class="material-icons prefix">account_circle</i>
                      <Input id="icon_prefix" type="text"/>
                      <label className="active" for="icon_prefix">First Name</label>                      
                  </div>
              )}
          </FormItem>

          <FormItem>
              {getFieldDecorator('secondName', {
                  rules: [{ required: true, message: 'Please input your second name!' }],
              })(
                  <div class="input-field col s6">
                      <i class="material-icons prefix">account_circle</i>
                      <Input id="icon_prefix" type="text"/>
                      <label className="active" for="icon_prefix">Second Name</label>                      
                  </div>
              )}
          </FormItem>
          
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
                <div class="input-field col s12">
                    <i class="material-icons prefix">email</i>
                    <Input type="email"/>
                    <label className="active" for="email">Email</label>
                </div>
              
            )}
          </FormItem>

          <FormItem>
              {getFieldDecorator('age', {
                  rules: [{ required: true, message: 'Please input your age!' }],
              })(
                  <div class="input-field col s12">
                      <i class="material-icons prefix">date_range</i>
                      <Input/>                    
                      <label className="active" for="age">Age</label>
                  </div>           
              )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <div className="input-field col s12">
                  <i class="material-icons prefix">lock</i>
                  <Input type="password" />
                  <label className="active" for="login-input">Password</label>
              </div>   
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
                <div className="input-field col s12">
                    <i class="material-icons prefix">lock</i>
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                    <label className="active" for="login-input">Confirm password</label>
                </div>          
            )}
          </FormItem>

          <FormItem>
              <div className="row">                
                  <button class="btn waves-effect waves-light" type="submit">SignUp
                  <i class="material-icons right">send</i>
                  </button> 
              </div>
          </FormItem>

        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, firstName, secondName, email, age, password1, password2) => dispatch(actions.authSignup(username, firstName, secondName, email, age, password1, password2)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);