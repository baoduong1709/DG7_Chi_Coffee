import { useEffect, useState } from 'react';
import productApi from '~/api/productApi';
// import { useParams } from 'react-router-dom';

function Coffee() {
    // const { id } = useParams;

    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const params = {
                    idProductType: 1,
                };
                const response = await productApi.getAll(params);
                // setProduct(response);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, []);

    return (
        <div>
            {/* {product.map((Productitem) => (
                <h1 key={Productitem.idProductType}>{Productitem.name}</h1>
            ))} */}

            {/* <p>{id}</p> */}
            <h1>ádasd</h1>
        </div>
    );
}

export default Coffee;
