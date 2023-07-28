import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useEffect, useState, useContext } from 'react';
import productApi from '~/api/productApi';
import { useParams } from 'react-router-dom';
import { CartContext } from '~/context/cartContext';
import Swal from 'sweetalert2';

import '~/assets/css/detailsProduct.css';
import '~/assets/css/loading.css';

function DetailsPage() {
    const { id } = useParams();
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await productApi.get(id);
                setDetail(response);
                setLoading(false);
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi hệ thống',
                    timer: 1500,
                });
            }
        };
        fetchDetails();
    }, [id]);

    const [number, setNumber] = useState(1);
    const decrease = () => {
        if (number <= 1) {
            setNumber(1);
        } else {
            removeItemCart(detail);
            setNumber(number - 1);
        }
    };
    const increase = () => {
        addToCart(detail);
        setNumber(number + 1);
    };
    const [loadingApi, setLoading] = useState(false);
    const { addToCart, removeItemCart } = useContext(CartContext);
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <div className="content-product-details">
            {loadingApi && (
                <div className="follow-the-leader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            <div className="details-item">
                <div className="content-img">
                    <img className="img-item" src={detail.product_image} alt={detail.product_image_name} />
                </div>
                <div className="content-info">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Trang Chủ</Breadcrumb.Item>
                        <Breadcrumb.Item href={`/product/${detail.product_type_name}`}>Sản Phẩm</Breadcrumb.Item>
                        <Breadcrumb.Item active>{detail.product_name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="name-item">{detail.product_name}</h1>
                    <div className="info-price">{formatter.format(detail.new_price).replace(/₫/g, 'VNĐ')}</div>
                    <div className="info-quantity">
                        <label>Số Lượng</label>
                        <div className="add-item">
                            <span className="change-decrease" onClick={decrease}>
                                -
                            </span>
                            <span className="quantity">{number}</span>
                            <span className="change-increase" onClick={increase}>
                                +
                            </span>
                        </div>
                        <input type="hidden" value={number} />
                    </div>
                    <button onClick={() => addToCart(detail)} className="btn btn-danger btn-add button">
                        <i className="fa fa-shopping-cart" />
                        <span className="btn-cart"> Thêm vào giỏ hàng</span>
                    </button>
                </div>
            </div>
            <div className="details-about">
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-12 info info-left">
                        <h1>Thông tin sản phẩm</h1>
                        <hr width="100%" align="center" />
                        <p>{detail.description}</p>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12 info-image">
                        <img src={detail.product_image} alt={detail.product_image_name} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
