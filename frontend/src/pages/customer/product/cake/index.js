import { useEffect, useState } from 'react';
import productApi from '~/api/productApi';

function Cake() {
    const [product, setProduct] = useState('');
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const params = {
                    idProductType: 2,
                };
                const response = await productApi.getAll(params);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, []);
    return <h1>cake</h1>;
}

export default Cake;
