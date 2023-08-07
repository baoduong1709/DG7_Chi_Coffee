import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productTypeApi from '~/api/customer/productTypeApi';
import { UserContext } from '~/context/userContext';
import { CartContext } from '~/context/cartContext';
import Swal from 'sweetalert2';
import NavDropdown from 'react-bootstrap/NavDropdown';

import '~/assets/css/header.css';

function Header() {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const [productType, setProductType] = useState([]);
    useEffect(() => {
        const fetchProductType = async () => {
            try {
                const response = await productTypeApi.getAll();
                setProductType(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductType();
    }, []);

    const { logout, user } = useContext(UserContext);
    const handleLogout = () => {
        Swal.fire({
            icon: 'question',
            title: 'Bạn có muốn đăng xuất tài khoản? ',
            showDenyButton: true,
            confirmButtonText: 'Có',
            denyButtonText: 'Không',
            width: '400px',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ title: 'Ban đã đăng xuất tài khoản', icon: 'success', timer: 1500 });
                logout();
                navigate('/');
            }
        });
    };

    return (
        <header className="wrapper">
            <div className="inner">
                <div className="logo-img">
                    <Link to="/">
                        <img style={{ height: '100px' }} src={images.logo} alt="Chi Coffee" />
                    </Link>
                </div>
                <div className="ulHeader">
                    <ul>
                        {productType.map((product) => (
                            <li className="liItem dis" key={product._id}>
                                <Link to={`/product/${product.name}`}>{product.name_display}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="btn-user">
                    <div className="liItem dn ">
                        <Link to="/cart">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="cart-number">{cartItems.length}</span>&nbsp;
                        </Link>

                        {user && user.auth === true ? (
                            <NavDropdown title={user.username} id="basic-nav-dropdown" className="navdropdown">
                                <NavDropdown.Item href="/customer/information">Thông tin cá nhân</NavDropdown.Item>
                                <NavDropdown.Item href="/orderHistory">Lịch sử đặt hàng</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} style={{ color: '#de4057' }}>
                                    ĐĂNG XUẤT
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Link to="/login">ĐĂNG NHẬP</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
