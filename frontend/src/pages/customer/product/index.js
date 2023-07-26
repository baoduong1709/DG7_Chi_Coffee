import { Fragment, useEffect, useState } from 'react';
import productApi from '~/api/productApi';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import '~/assets/css/product.css';
import '~/assets/css/loading.css';

function Product() {
    const { id } = useParams();
    console.log(id);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            setLoangApi(true);
            try {
                const response = await productApi.getIdAll(id);
                console.log(response);
                setProduct(response);
                setLoangApi(false);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi hệ thống',
                    timer: 1500,
                });
            }
        };
        fetchProduct();
        setProduct([]);
    }, [id]);
    const [loadingApi, setLoangApi] = useState(false);
    return (
        <div className="menu-section">
            <div className="container-content product-content">
                <div className="product-list">
                    {loadingApi && (
                        <div className="follow-the-leader">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                    {product.map((Productitem) => (
                        <div className="menu-item item" key={Productitem._id}>
                            <Link to={`/product/details/${Productitem._id}`}>
                                <Fragment>
                                    <div className="item-img">
                                        <img
                                            className="menu-item-img"
                                            src={Productitem.product_image}
                                            alt="Trà sen vàng"
                                        />
                                    </div>
                                    <div className="menu-content ">
                                        <h3 className="conent-heading">{Productitem.product_name}</h3>
                                        <p>{Productitem.new_price}</p>
                                        <div className="item-btn">
                                            <button className="btn btn-danger btn-add-cart" type="button">
                                                <i className="fa fa-shopping-cart"></i>
                                                <span className="btn-heading">Thêm vào giỏ hàng</span>
                                            </button>
                                        </div>
                                    </div>
                                </Fragment>
                            </Link>
                        </div>
                    ))}
                    <div className="clear"></div>
                </div>
            </div>
        </div>
    );
}

export default Product;
