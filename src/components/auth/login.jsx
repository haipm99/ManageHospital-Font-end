import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import 'antd/es/date-picker/style/css';
import '../auth/login_css.css';
import axios from 'axios';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    };
    onchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    loginFunction = async (data) => {
        return (
            axios.post('http://localhost:5000/api/account/login', data)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        localStorage.setItem('fullName', res.data.fullName);
                    }
                    return res.status;
                })

        )
    };

    onSubmit = async (e) => {
        e.preventDefault();
        const status = await this.loginFunction(this.state);
        if (status === 200) {
            window.location = "/home"
        }
        else {
            alert('fail');
        }
    }

    render() {
        return (
            <div className="main-container-login">
                <div className="login-box">
                    <Form onSubmit={this.onSubmit} className="login-form">
                        <Form.Item>
                            <center><h1 style={{ color: 'white' }}>Login</h1></center>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: '20px' }}>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username" name='username' onChange={this.onchange}
                            />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: '20px' }}>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password" name='password' onChange={this.onchange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        );
    }
}
export default login;