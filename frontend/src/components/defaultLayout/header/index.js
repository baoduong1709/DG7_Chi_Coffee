import images from '~/assets/images';
import { Link } from 'react-router-dom';
import '~/assets/css/header.css';
import { useEffect, useState } from 'react';
import productApi from '~/api/productTypeApi';

function Header() {
    const [productType, setProductType] = useState([]);
    useEffect(() => {
        const fetchProductType = async () => {
            try {
                const response = await productApi.getAll();

                setProductType(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductType();
    }, []);

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
                            <li className="liItem dis" key={product.id}>
                                {product.nameDisplay}
                            </li>
                        ))}
                        <li className="liItem ">
                            <Link to="/Login">ĐĂNG NHẬP</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
