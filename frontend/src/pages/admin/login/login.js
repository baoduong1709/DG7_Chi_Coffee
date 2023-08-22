import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../../assets/images/logo.png';
import { useNavigate } from 'react-router';

import { ToastOption } from '../../../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './login.css';

export default function EmployeeLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const loginRoute = 'https://ex-dg7-chi-coffee.onrender.com/api/v1/employee/auth';
    const navigate = useNavigate();

    useEffect(() => {
        let adminData = localStorage.getItem('user-admin');
        if (adminData) {
            let getAuth = JSON.parse(adminData);
            toast.warning('Bạn phải đăng xuất trước!', ToastOption);
            if (getAuth.isAdmin === true) {
                setTimeout(window.location.assign('./dashboard'), 0);
            } else {
                setTimeout(window.location.assign('./order'), 0);
            }
        }
    }, []);

    const validateLogin = () => {
        if (!username) {
            toast.warning('Chưa nhập tài khoản', ToastOption);
            return false;
        } else if (!password) {
            toast.warning('Chưa nhập mật khẩu', ToastOption);
            return false;
        } else {
            return true;
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (validateLogin()) {
            let value = { username: username, password: password };
            const res = await axios
                .post(loginRoute, value)
                .then((res) => {
                    localStorage.setItem('user-admin', JSON.stringify(res.data));
                    navigate('../admin/dashboard');
                })
                .catch((err) => {
                    let status = err.response.status;
                    let data = err.response.data;
                    toast.error('Lỗi ' + status + ': ' + data, ToastOption);
                });
        }
    };

    const handeShowPassword = () => {
        setShowPassword((showPassword) => !showPassword);
    };
    return (
        <div className="container" id="container-login">
            <div className="app-wrapper" id="form-control">
                <div className="content" id="content-login">
                    <img id="logo" src={logo} alt="" />
                    <div className="text-title">
                        Đăng nhập <br /> Admin
                    </div>
                    <div className="form-group">
                        <p>
                            <input
                                type="text"
                                name="form-input"
                                id="username"
                                placeholder="Tên đăng nhập"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </p>
                        <p id="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="form-input"
                                id="password"
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                id="eye"
                                onClick={handeShowPassword}
                                viewBox="0 0 576 512"
                            >
                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                            </svg>
                        </p>
                        <button type="submit" name="form-input" id="submit" onClick={(e) => handleLogin(e)}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
