import { CartContext } from '~/context/cartContext';
import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import image from '~/assets/images';

import '~/assets/css/cart.css';
import axios from 'axios';

function Cart() {
    const { cartItems, addToCart, removeItemCart, clearItemCart, clearCart, getCartTotal } = useContext(CartContext);
    const navigate = useNavigate();
    const isUser = localStorage.getItem('token');
    const onCheckout = async () => {
        if (cartItems.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Giỏ hàng trống',
                width: '400px',
            });
        } else if (isUser) {
            const data = cartItems.map((item) => ({
                product_id: item._id,
                product_name: item.product_name,
                quanlity: item.quantity,
            }));

            const cart_product_item = {
                product: data,
                cost: getCartTotal(),
                amount: cartItems.length,
            };
            Swal.fire({
                title: 'Bạn có chắc thanh toán không ?',
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'Hủy bỏ',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Thanh toán',
                width: '400px',
            }).then((result) => {
                if (result.isConfirmed) {
                    const config = { headers: { Authorization: `${JSON.parse(isUser)['token']}` } };
                    axios
                        .post('https://ex-dg7-chi-coffee.onrender.com/api/v1/order/create', cart_product_item, config)
                        .then((response) => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Bạn đã thanh toán thành công',
                            });
                            clearCart();
                        })
                        .catch((error) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Lỗi hệ thống',
                                timer: 1500,
                            });
                        });
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Bạn phải đăng nhập trước khi thanh toán',
                width: '400px',
            });
            navigate('/login');
        }
    };

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <section className="h-100">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card card-registration card-registration-2" style={{ borderRadius: 15 }}>
                            <div className="card-body p-0">
                                <div className="row g-0" style={{ alignItems: 'unset' }}>
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-danger text-uppercase">Giỏ hàng</h1>
                                                <h4
                                                    style={{ cursor: 'pointer' }}
                                                    className="text-uppercase text-danger fw-bold mb-0"
                                                    onClick={() => {
                                                        clearCart();
                                                    }}
                                                >
                                                    Xóa giỏ hàng
                                                </h4>
                                            </div>
                                            {cartItems.map((item) => (
                                                <Fragment key={item._id}>
                                                    <hr className="my-4" />

                                                    <div
                                                        className="row mb-4 d-flex justify-content-between align-items-center"
                                                        key={item._id}
                                                    >
                                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={item.product_image}
                                                                className="img-fluid rounded-3"
                                                                alt="Cotton T-shirt"
                                                            />
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <h4 className="text-muted text-capitalize">
                                                                {item.product_type_name}
                                                            </h4>
                                                            <h4 className="text-black mb-0">{item.product_name}</h4>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                            <div className="add-item">
                                                                <span
                                                                    className="change-decrease"
                                                                    onClick={() => {
                                                                        removeItemCart(item);
                                                                    }}
                                                                >
                                                                    -
                                                                </span>
                                                                <span className="quantity">{item.quantity}</span>
                                                                <span
                                                                    className="change-increase"
                                                                    onClick={() => {
                                                                        addToCart(item);
                                                                    }}
                                                                >
                                                                    +
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h4 className="mb-0">
                                                                {formatter
                                                                    .format(item.new_price * item.quantity)
                                                                    .replace(/₫/g, 'VNĐ')}
                                                            </h4>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                            <i
                                                                className="fas fa-times"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    clearItemCart(item);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ))}
                                            <hr className="my-4" />
                                        </div>
                                    </div>

                                    <div className="col-lg-4 bg-grey py-5">
                                        <div className="p-5">
                                            <h1 className="fw-bold mb-5 mt-2 pt-1 text-danger text-uppercase">
                                                đơn hàng
                                            </h1>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase">Tổng tiền tạm tính</h5>
                                                <h5>{formatter.format(getCartTotal()).replace(/₫/g, 'VNĐ')} </h5>
                                            </div>

                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-5 total-money">
                                                <h4 className="text-uppercase fw-bold">Tổng tiền</h4>
                                                <h1>{formatter.format(getCartTotal()).replace(/₫/g, 'VNĐ')} </h1>
                                            </div>
                                            <h3>Vui lòng quét mã QR để thanh toán</h3>
                                            <img src={image.qr} alt="QR" style={{ height: '100px', width: '100px' }} />
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-block btn-lg btn-total button"
                                                data-mdb-ripple-color="danger"
                                                onClick={onCheckout}
                                                style={{ marginTop: '25px' }}
                                            >
                                                Thanh toán
                                            </button>
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

export default Cart;
