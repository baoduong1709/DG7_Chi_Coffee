import { Carousel } from 'react-responsive-carousel';
import image from '~/assets/images';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Carousels() {
    let listImg = [
        {
            id: 1,
            image: image.carousel_1,
        },
        {
            id: 2,
            image: image.carousel_2,
        },
        {
            id: 3,
            image: image.carousel_3,
        },
        {
            id: 4,
            image: image.carousel_4,
        },
    ];
    return (
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={true}>
            {listImg.map((Img) => (
                <div key={Img.id}>
                    <img key={Img.id} style={{ height: '500px' }} alt="" src={Img.image} />
                </div>
            ))}
        </Carousel>
    );
}
export default Carousels;
