import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productTypeApi from '~/api/productTypeApi';
import '~/assets/css/header.css';

function Header() {
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

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    });
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
                            <Link to={`/product/${product.id}`}>
                                <li className="liItem dis" key={product.id}>
                                    {product.nameDisplay}
                                </li>
                            </Link>
                        ))}
                        <li className="liItem ">
                            <Link to="/login">ĐĂNG NHẬP</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
