import '~/assets/css/cart.css';
import { useState } from 'react';

function Cart() {
    const [number, setNumber] = useState(1);
    const decrease = () => {
        if (number <= 1) {
            setNumber(1);
        } else {
            setNumber(number - 1);
        }
    };
    const increase = () => {
        setNumber(number + 1);
    };
    return (
        <section className="h-100 h-custom">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card card-registration card-registration-2" style={{ borderRadius: 15 }}>
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-danger text-uppercase">Giỏ hàng</h1>
                                                <h4 className="mb-0 text-muted">1 sản phẩm</h4>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                                                <div className="col-md-2 col-lg-2 col-xl-2">
                                                    <img
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                                                        className="img-fluid rounded-3"
                                                        alt="Cotton T-shirt"
                                                    />
                                                </div>
                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                    <h4 className="text-muted">Shirt</h4>
                                                    <h4 className="text-black mb-0">Cotton T-shirt</h4>
                                                </div>
                                                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                    <div className="add-item">
                                                        <span className="change-decrease" onClick={decrease}>
                                                            -
                                                        </span>
                                                        <span className="quantity">{number}</span>
                                                        <span className="change-increase" onClick={increase}>
                                                            +
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                    <h4 className="mb-0">€ 44.00</h4>
                                                </div>
                                                <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                    <a href="#!" className="text-muted">
                                                        <i className="fas fa-times" />
                                                    </a>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">
                                            <h1 className="fw-bold mb-5 mt-2 pt-1 text-danger text-uppercase">
                                                đơn hàng
                                            </h1>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase">Tổng tiền tạm tính</h5>
                                                <h5>€ 132.00</h5>
                                            </div>
                                            {/* <h4 className="text-uppercase mb-3">Shipping</h4>
                                            <div className="mb-4 pb-2">
                                                <select className="select">
                                                    <option value={1}>Standard-Delivery- €5.00</option>
                                                    <option value={2}>Two</option>
                                                    <option value={3}>Three</option>
                                                    <option value={4}>Four</option>
                                                </select>
                                            </div>
                                            <h4 className="text-uppercase mb-3">Give code</h4>
                                            <div className="mb-5">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="form3Examplea2"
                                                        className="form-control form-control-lg"
                                                    />
                                                    <label className="form-label" htmlFor="form3Examplea2">
                                                        Enter your code
                                                    </label>
                                                </div>
                                            </div> */}
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-5 total-money">
                                                <h4 className="text-uppercase fw-bold">Tổng tiền</h4>
                                                <h1>€ 137.00</h1>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-block btn-lg btn-total "
                                                data-mdb-ripple-color="danger"
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
