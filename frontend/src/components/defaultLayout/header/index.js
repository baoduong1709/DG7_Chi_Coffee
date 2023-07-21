import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productTypeApi from '~/api/productTypeApi';
import { UserContext } from '~/context/userContext';
import Swal from 'sweetalert2';
import NavDropdown from 'react-bootstrap/NavDropdown';

import '~/assets/css/header.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

function Header() {
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
                                <Link to={`/product/${product._id}`}>{product.name_display}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="btn-user">
                    <div className="liItem dn ">
                        <Link to="">
                            <i className="fas fa-shopping-cart"></i> &nbsp;
                        </Link>

                        {user && user.auth === true ? (
                            <NavDropdown title={user.username} id="basic-nav-dropdown" className="navdropdown">
                                <NavDropdown.Item href="#action/3.1">Thông tin cá nhân</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
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
