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
                <label htmlFor="mobile-input" className="btn-bars">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <style dangerouslySetInnerHTML={{ __html: 'svg{fill:#de4057}' }} />
                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                </label>
                <input type="checkbox" hidden className="mobile_input" id="mobile-input" />
                <label htmlFor="mobile-input" className="btn-bars_overlay"></label>
                <div className="ulHeader_mobile">
                    <label htmlFor="mobile-input" className="mobile-close">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </label>
                    <ul className="mobile_ul">
                        {productType.map((product) => (
                            <li className="liItem dis mobile_li" key={product._id}>
                                <Link to={`/product/${product.name}`}>{product.name_display}</Link>
                            </li>
                        ))}
                    </ul>
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
