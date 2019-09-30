import React from 'react';
import { Form, Input } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const FormItem = Form.Item;


class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
        this.props.history.push('/');
      }
    });
  }

  render() {
    let errorMessage = null;
    if (this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }

    const { getFieldDecorator } = this.props.form;
    return (
        <div>
            {errorMessage}
            {
                this.props.loading ?

                <div className="container center">
                    <div class="preloader-wrapper small active">
                        <div class="spinner-layer spinner-green-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>

                :
                <div className="container">
                    <Form onSubmit={this.handleSubmit} className="login-form">

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
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <div className="input-field col s12">
                                    <i class="material-icons prefix">lock</i>
                                    <Input id="login-input" type="password"/>
                                    <label className="active" for="login-input">Password</label>
                                </div>
                            )}
                        </FormItem>

                        <FormItem>
                            <div className="row">                
                                <button class="btn waves-effect waves-light" type="submit">Login
                                <i class="material-icons right">send</i>
                                </button> 
                            </div> 
                        </FormItem>
                    </Form>
                </div>
            }
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);