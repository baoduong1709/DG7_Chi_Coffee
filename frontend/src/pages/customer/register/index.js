import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { ToastOption } from '~/components/toastify';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';

import 'react-toastify/dist/ReactToastify.css';
import '~/assets/css/datePicker.css';
import '~/assets/css/register.css';

function Register() {
    const navigate = useNavigate();
    const [currentRadioValue, setCurrentRadioValue] = useState('');
    const [date, setDate] = useState(null);

    const inputHo = useRef();
    const inputTen = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();
    const inputConfirmPassword = useRef();
    const inputPhoneNumber = useRef();
    const inputAddress = useRef();
    const [loadingApi, setLoadingApi] = useState(false);

    const onChangeDate = (date) => {
        setDate(date);
    };
    const formattedDate = date ? dayjs(date).format('MM-DD-YYYY') : '';

    const onChangeRadio = (e) => {
        const value = e.target.value;
        setCurrentRadioValue(value);
    };
    const today = dayjs();
    const minimumBirthYear = today.subtract(16, 'year').year();
    const selectedBirthYear = date ? dayjs(date).year() : null;

    const onSubmitRegister = () => {
        const ho = inputHo.current.value;
        const ten = inputTen.current.value;
        const gmail = inputEmail.current.value;
        const password = inputPassword.current.value;
        const confirmPassword = inputConfirmPassword.current.value;
        const phone_number = inputPhoneNumber.current.value;
        const address = inputAddress.current.value;
        const phoneRegex = /^\d+$/;

        if (
            !ho ||
            !ten ||
            !gmail ||
            !password ||
            !confirmPassword ||
            !currentRadioValue ||
            !formattedDate ||
            !phone_number ||
            !address
        ) {
            toast.warning('Vui lòng điền đầy đủ thông tin', ToastOption);
            return;
        }

        if (!ho) {
            toast.warning('Chưa nhập họ', ToastOption);
            return;
        }
        if (!ten) {
            toast.warning('Chưa nhập tên', ToastOption);
            return;
        }
        if (!gmail) {
            toast.warning('Chưa nhập gmail', ToastOption);
            return;
        }
        if (!gmail.endsWith('@gmail.com') && !gmail.endsWith('@outlook.com')) {
            toast.warning('Nhập mail không hợp lệ', ToastOption);
            return;
        }
        if (!password) {
            toast.warning('Chưa nhập mật khẩu', ToastOption);
            return;
        }
        if (password.length < 4) {
            toast.warning('Mật khẩu phải tối thiểu 4 ký tự', ToastOption);
        }
        if (password !== confirmPassword) {
            toast.warning('Mật khẩu không khớp', ToastOption);
            return;
        }
        if (!currentRadioValue) {
            toast.warning('Chưa chọn giới tính', ToastOption);
            return;
        }
        if (!formattedDate) {
            toast.warning('Chưa chọn ngày sinh', ToastOption);
            return;
        }
        if (selectedBirthYear && selectedBirthYear > minimumBirthYear) {
            toast.warning('Bạn phải đủ 16 tuổi trở lên để đăng ký tài khoản', ToastOption);
            return;
        }
        if (!phone_number) {
            toast.warning('Chưa nhập số điện thoại', ToastOption);
            return;
        }

        if (!phoneRegex.test(phone_number)) {
            toast.warning('Số điện thoại phải là số', ToastOption);
            return;
        }
        if (phone_number.length < 10 || phone_number.length > 12) {
            toast.warning('Số điện thoại không hợp lệ', ToastOption);
            return;
        }
        if (!address) {
            toast.warning('Chưa nhập địa chỉ', ToastOption);
            return;
        }

        setLoadingApi(true);
        let data_register = {
            name: `${ho} ${ten}`,
            gmail: gmail,
            password: password,
            gender: currentRadioValue,
            date_of_birth: formattedDate,
            phone_number: phone_number,
            address: address,
        };
        console.log('data_register: ', data_register);
        axios
            .post('https://ex-dg7-chi-coffee.onrender.com/api/v1/customer/create', data_register)
            .then((response) => {
                setLoadingApi(false);
                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    title: 'Tạo tài khoản thành công',
                    timer: 1000,
                });
                navigate('/Login');
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'warning',
                    title: 'Tài khoản không chính xác',
                    timer: 3000,
                });
                setLoadingApi(false);
            });
    };

    return (
        <section className="h-100 ">
            <div className="container py-5 h-100" style={{ minWidth: 'unset' }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-6 d-none d-xl-block">
                                    <img
                                        src="https://images.pexels.com/photos/7937505/pexels-photo-7937505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        alt="Sample"
                                        className="img-fluid"
                                        style={{
                                            borderTopLeftRadius: '.25rem',
                                            borderBottomLeftRadius: '.25rem',
                                            height: '790px',
                                        }}
                                    />
                                </div>
                                <div className="col-xl-6">
                                    <div className="card-body p-md-5 text-black">
                                        <h1 className="mb-5 text-uppercase info-heading">ĐĂNG KÝ TÀI KHOẢN</h1>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="form3Example1m"
                                                        placeholder="Họ"
                                                        className="form-control form-control-lg input-info"
                                                        ref={inputHo}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="form3Example1n"
                                                        placeholder="Tên"
                                                        className="form-control form-control-lg input-info"
                                                        ref={inputTen}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="form3Example8"
                                                placeholder="Email"
                                                className="form-control form-control-lg input-info"
                                                ref={inputEmail}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="password"
                                                        placeholder="Nhập mật khẩu"
                                                        className="form-control form-control-lg input-info"
                                                        ref={inputPassword}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="password"
                                                        placeholder="Nhập lại mật khẩu"
                                                        className="form-control form-control-lg input-info"
                                                        ref={inputConfirmPassword}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                            <h3 className="mb-0 me-4" style={{ color: '#333' }}>
                                                Giới tính:
                                            </h3>
                                            <div className="form-check form-check-inline mb-0 me-4">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="femaleGender"
                                                    defaultValue="Nam"
                                                    onChange={onChangeRadio}
                                                    style={{ minWidth: 'unset' }}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="femaleGender"
                                                    style={{ color: '#333' }}
                                                >
                                                    Nam
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline mb-0 me-4">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="maleGender"
                                                    defaultValue="Nữ"
                                                    onChange={onChangeRadio}
                                                    style={{ minWidth: 'unset' }}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="maleGender"
                                                    style={{ color: '#333' }}
                                                >
                                                    Nữ
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline mb-0 ">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="maleGender"
                                                    defaultValue="Khác"
                                                    onChange={onChangeRadio}
                                                    style={{ minWidth: 'unset' }}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="otherGender"
                                                    style={{ color: '#333' }}
                                                >
                                                    Khác
                                                </label>
                                            </div>
                                        </div>
                                        <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                            <h3
                                                className="mb-0 me-4"
                                                style={{ marginTop: '-10px', color: '#333', paddingTop: '10px' }}
                                            >
                                                Ngày sinh:
                                            </h3>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    onChange={onChangeDate}
                                                    defaultValue={formattedDate}
                                                    maxDate={today}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                placeholder="Số điện thoại"
                                                className="form-control form-control-lg input-info"
                                                ref={inputPhoneNumber}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="form3Example90"
                                                placeholder="Địa chỉ"
                                                className="form-control form-control-lg input-info"
                                                ref={inputAddress}
                                            />
                                        </div>

                                        <div className="d-flex justify-content-center pt-3">
                                            <button
                                                type="button"
                                                className="btn  btn-lg ms-2 btn-register"
                                                onClick={onSubmitRegister}
                                            >
                                                ĐĂNG KÝ &nbsp;
                                                {loadingApi && <i className="fas fa-circle-notch fa-spin"></i>}
                                            </button>
                                            <ToastContainer />
                                        </div>
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

export default Register;
