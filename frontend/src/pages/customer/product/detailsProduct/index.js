import { useEffect, useState } from 'react';
import productApi from '~/api/productApi';
import { useParams } from 'react-router-dom';

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

    return (
        <div className="conten">
            <div className="menu-list">
                <div className="menu-item" key={detail.id}>
                    <img className="menu-item-img" src={detail.img} alt="Trà sen vàng" />
                    <div className="menu-content">
                        <h3 className="conent-heading">{detail.name}</h3>
                        <p className="conent-text">{detail.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
