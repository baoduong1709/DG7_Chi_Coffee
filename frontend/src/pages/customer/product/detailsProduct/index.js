import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useEffect, useState } from 'react';
import productApi from '~/api/productApi';
import { useParams } from 'react-router-dom';

import '~/assets/css/detailsProduct.css';

function DetailsPage() {
    const { id } = useParams();

    const [detail, setDetail] = useState([]);
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await productApi.get(id);
                setDetail(response);
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDetails();
    }, [id]);

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
        <div className="content-product-details">
            <div className="details-item">
                <div className="content-img">
                    <img
                        className="img-item"
                        src="https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/TRA-SEN-VANG-CN-5.1.png"
                        alt=""
                    />
                </div>
                <div className="content-info">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Trang Chủ</Breadcrumb.Item>
                        <Breadcrumb.Item href={`/product/${detail.idProductType}`}>Sản Phẩm</Breadcrumb.Item>
                        <Breadcrumb.Item active>{detail.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className="name-item">{detail.name}</h1>
                    <div className="info-price">{detail.newPrice * number}</div>
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
                    <button className="btn btn-danger btn-add">
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
                        <p>
                            Mô tả: Hạt cà phê robusta có hình tròn với đường rảnh thẳng ở giữa hạt. Cà phê Robusta có
                            mùi thơm dịu, vị đắng, đậm, vị chát, nước có màu nâu sánh, ít chua mang lại sự hứng khởi và
                            sáng tạo cho người dùng.
                        </p>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12 info-image">
                        <img
                            src="https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/TRA-SEN-VANG-CN-5.1.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
