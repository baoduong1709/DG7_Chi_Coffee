import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ToastOption } from '~/components/toastify';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import userApi from '~/api/userApi';

import '~/assets/css/information.css';

function Information() {
    const [date, setDate] = useState(null);
    const onChangeDate = (date) => {
        setDate(date);
    };

    const formattedDate = date ? dayjs(date).format('MM/DD/YYYY') : '';
    const today = dayjs();
    const minimumBirthYear = today.subtract(16, 'year').year();
    const selectedBirthYear = date ? dayjs(date).year() : null;

    const [information, setInformation] = useState([]);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null); // Trạng thái để lưu trữ ngày sinh

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userApi.get();
                setInformation(response);
                setDateOfBirth(dayjs(response.date_of_birth, 'MM/DD/YYYY')); // Lưu trữ ngày sinh từ API vào trạng thái
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (information.name) {
            const [hoValue, tenValue] = information.name.split(' ');
            setFirstName(hoValue);
            setLastName(tenValue);
        } else {
            console.log('Không có tên người dùng.');
        }
    }, [information]);

    const [isEditing, setIsEditing] = useState(false);
    const inputFirstName = useRef();
    const inputLastName = useRef();
    const inputPhoneNumber = useRef();
    const inputAddress = useRef();

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdateClick = async () => {
        setIsEditing(false);
        const FirstName = inputFirstName.current.value;
        const LastName = inputLastName.current.value;
        const PhoneNumber = inputPhoneNumber.current.value;
        const Address = inputAddress.current.value;
        const phoneRegex = /^\d+$/;

        if (!FirstName) {
            toast.warning('Chưa nhập họ', ToastOption);
            return;
        }
        if (!LastName) {
            toast.warning('Chưa nhập tên', ToastOption);
            return;
        }
        if (selectedBirthYear && selectedBirthYear > minimumBirthYear) {
            toast.warning('Bạn phải đủ 16 tuổi trở lên để đăng ký tài khoản', ToastOption);
            return;
        }
        if (!PhoneNumber) {
            toast.warning('Chưa nhập số điện thoại', ToastOption);
            return;
        }

        if (!phoneRegex.test(PhoneNumber)) {
            toast.warning('Số điện thoại phải là số', ToastOption);
            return;
        }
        if (PhoneNumber.length < 10 || PhoneNumber.length > 12) {
            toast.warning('Số điện thoại không hợp lệ', ToastOption);
            return;
        }
        if (!Address) {
            toast.warning('Chưa nhập địa chỉ', ToastOption);
            return;
        }

        const data_information = {
            name: `${FirstName} ${LastName}`,
            date_of_birth: formattedDate,
            phone_number: PhoneNumber,
            address: Address,
        };
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await userApi.update(data_information);
            Swal.fire({
                icon: 'success',
                showConfirmButton: false,
                title: 'Cập nhập thành công',
                timer: 1000,
            });
        } catch (err) {
            Swal.fire({
                icon: 'warning',
                title: 'Cập nhập thất bại',
                timer: 3000,
            });
            console.log(err);
        }
    };

    return (
        <section className="py-5 my-5">
            <div className="container">
                <h1 className="mb-5 text-uppercase text-danger text-center fw-bold">Thông tin cá nhân</h1>
                <div className="bg-white shadow rounded-lg d-block d-sm-flex">
                    <div className="profile-tab-nav border-right">
                        <div className="p-4">
                            <div className="img-circle text-center mb-3">
                                <img
                                    src="https://img.lovepik.com/free-png/20210923/lovepik-cute-girl-avatar-png-image_401231841_wh1200.png"
                                    alt="Imae"
                                    className="shadow"
                                />
                            </div>
                            <h4 className="text-center">{information.name}</h4>
                        </div>
                        <div
                            className="nav flex-column nav-pills"
                            id="v-pills-tab"
                            role="tablist"
                            aria-orientation="vertical"
                        >
                            <a
                                className="nav-link active"
                                id="account-tab"
                                data-toggle="pill"
                                href="#account"
                                role="tab"
                                aria-controls="account"
                                aria-selected="true"
                            >
                                <i className="fa fa-home text-center mr-1" />
                                Thông tin
                            </a>
                            {/* <a
                                className="nav-link"
                                id="password-tab"
                                data-toggle="pill"
                                href="#password"
                                role="tab"
                                aria-controls="password"
                                aria-selected="false"
                            >
                                <i className="fa fa-key text-center mr-1" />
                                Mật Khẩu
                            </a> */}
                        </div>
                    </div>
                    <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="account"
                            role="tabpanel"
                            aria-labelledby="account-tab"
                        >
                            <h3 className="mb-4 text-capitalize">cài đặt thông tin</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Họ</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={firstName}
                                            readOnly={!isEditing}
                                            ref={inputFirstName}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Tên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={lastName}
                                            readOnly={!isEditing}
                                            ref={inputLastName}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={information.gmail}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-capitalize">Số điện thoại</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={information.phone_number}
                                            ref={inputPhoneNumber}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-capitalize">ngày sinh</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                className="form-control"
                                                onChange={onChangeDate}
                                                // defaultValue={formattedDate}
                                                value={dateOfBirth}
                                                maxDate={today}
                                                readOnly={!isEditing}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-capitalize">Địa chỉ</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={information.address}
                                            ref={inputAddress}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                {isEditing ? (
                                    <button
                                        className="btn btn-danger text-uppercase btn-group"
                                        onClick={handleUpdateClick}
                                    >
                                        cập nhật
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-danger text-uppercase btn-group"
                                        onClick={handleEditClick}
                                    >
                                        Sửa
                                    </button>
                                )}

                                <button className="btn btn-light text-uppercase btn-group">hủy bỏ</button>
                            </div>
                            <ToastContainer />
                        </div>
                        {/* <div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                            <h3 className="mb-4 text-capitalize">cài đặt mật khẩu</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-capitalize">mật khẩu cũ</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-capitalize">mật khẩu mới</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-capitalize">nhập lại mật khẩu mới</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-danger text-uppercase">cập nhật</button>
                                <button className="btn btn-light text-uppercase">hủy bỏ</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Information;
