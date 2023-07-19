import images from '~/assets/images';
import { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '~/assets/css/loginCustomer.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState('');

    const onChangeUser = (e) => {
        const value = e.target.value;
        setUsername(value);
    };
    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };
    const validationAll = () => {
        const warning = {};
        if (isEmpty(username)) {
            warning.username = 'Nhập tên đăng nhập';
        }
        if (isEmpty(password)) {
            warning.password = 'Nhập mật khẩu';
        }
        setValidation(warning);
        if (Object.keys(warning).length > 0) {
            return false;
        } else {
            return true;
        }
    };
    const onSubmitLogin = () => {
        const isValid = validationAll();
        if (!isValid) return;
        //call API
        axios
            .post('https://reqres.in/api/login', {
                username: username,
                password: password,
            })
            .then((result) => {
                console.log(result.data);
                let user = JSON.parse(result.config.data);
                localStorage.setItem('token', JSON.stringify(result.data));
                localStorage.setItem('username', user.username);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'warning',
                    title: 'Tài khoản không chính xác',
                    timer: 3000,
                });
            });
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            onSubmitLogin();
        }
    };

    return (
        <section className="vh-100 ">
            <div
                className=" container py-5 h-100 "
                style={{ minWidth: 'unset', paddingLeft: 'unset', paddingRight: 'unset' }}
            >
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10 ">
                        <div className="card " style={{ borderRadius: '1rem', boxShadow: 'rgba(0, 0, 0, 0.15)' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="https://images.pexels.com/photos/7937505/pexels-photo-7937505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        alt="login form"
                                        className="img-fluid"
                                        style={{ borderRadius: '1rem 0 0 1rem' }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onKeyDown={handleKeyDown}>
                                            <div
                                                className="d-flex align-items-center mb-3 pb-1"
                                                style={{ maxWidth: '200px', justifyContent: 'center' }}
                                            >
                                                <img src={images.logo} alt="logo" className="logo-login" />
                                            </div>

                                            <h1
                                                className="mb-3 pb-3"
                                                style={{
                                                    letterSpacing: '1px',
                                                    textAlign: 'center',
                                                    color: '#de4057',
                                                    fontWeight: 'bold',
                                                    fontSize: '35px',
                                                }}
                                            >
                                                ĐĂNG NHẬP
                                            </h1>

                                            <div className="form-outline mb-5">
                                                <input
                                                    id="form2Example17"
                                                    style={{
                                                        height: '45px',
                                                        width: '70%',
                                                        marginLeft: '74px',
                                                        fontSize: '1.6rem',
                                                    }}
                                                    className="form-control form-control-lg"
                                                    placeholder="Tên đăng nhập"
                                                    // autoComplete="on" // đề xuất tên đã điền vào form
                                                    required
                                                    onChange={onChangeUser}
                                                />
                                                {/* <label className="form-label" htmlFor="form2Example17">
                                                    TÊN ĐĂNG NHẬP
                                                </label> */}
                                                <p className="warning">{validation.username}</p>
                                            </div>

                                            <div className="form-outline mb-5">
                                                <input
                                                    type="password"
                                                    id="form2Example27"
                                                    style={{
                                                        height: '45px',
                                                        width: '70%',
                                                        marginLeft: '74px',
                                                        fontSize: '1.6rem',
                                                    }}
                                                    className="form-control form-control-lg"
                                                    placeholder="Mật khẩu"
                                                    required // bắt buộc điền trước khi submit đi
                                                    onChange={onChangePassword}
                                                />
                                                {/* <label className="form-label" htmlFor="form2Example27">
                                                    MẬT KHẨU
                                                </label> */}
                                                <p className="warning">{validation.password}</p>
                                            </div>

                                            <div className="pt-4 mb-4" style={{ textAlign: 'center' }}>
                                                <button
                                                    className="btn btn-lg btn-block "
                                                    id="btn-login"
                                                    type="button"
                                                    style={{ width: '100px', height: '40px' }}
                                                    onClick={onSubmitLogin}
                                                >
                                                    ĐĂNG NHẬP
                                                </button>
                                            </div>
                                            <div className="link-item">
                                                <a href="#!" style={{ color: '#de4057', fontWeight: 'bold' }}>
                                                    Đăng ký tại đây
                                                </a>
                                                <a className="small " href="#!" style={{ color: '#de4057' }}>
                                                    Quên mật khẩu ?
                                                </a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
