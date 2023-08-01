import image from '~/assets/images';
import { useContext, useEffect, useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '~/assets/css/loginCustomer.css';
import { UserContext } from '~/context/userContext';

function Login() {
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState('');
    const [loadingApi, setLoangApi] = useState(false);

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

    const onSubmitLogin = async () => {
        const isValid = validationAll();
        if (!isValid) return;
        //call API
        setLoangApi(true);

        axios
            .post('https://ex-dg7-chi-coffee.onrender.com/api/v1/customer/auth', {
                gmail: username,
                password: password,
            })
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    title: 'Đăng nhập thành công',
                    timer: 1000,
                });
                loginContext(result.data);
                navigate('/');
                setLoangApi(false);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'warning',
                    title: 'Tài khoản không chính xác',
                    timer: 3000,
                });
                setLoangApi(false);
            });
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            onSubmitLogin();
        }
    };
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    });
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
                                        src={image.avatar}
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
                                                style={{
                                                    maxWidth: '36%',
                                                    justifyContent: 'center',
                                                    marginLeft: '12px',
                                                }}
                                            >
                                                <Link to={'/'}>
                                                    <img src={image.logo} alt="logo" className="logo-login" />
                                                </Link>
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
                                                    placeholder="Tên gmail"
                                                    required
                                                    onChange={onChangeUser}
                                                />
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
                                                    style={{ width: '130px', height: '40px' }}
                                                    onClick={onSubmitLogin}
                                                >
                                                    ĐĂNG NHẬP &nbsp;
                                                    {loadingApi && <i className="fas fa-circle-notch fa-spin"></i>}
                                                </button>
                                            </div>
                                            <div className="link-item">
                                                <Link to="/register" style={{ color: '#de4057', fontWeight: 'bold' }}>
                                                    Đăng ký tại đây
                                                </Link>
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
