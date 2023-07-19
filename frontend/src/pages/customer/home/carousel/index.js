import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

function Carousels() {
    let listImg = [
        {
            id: 1,
            image: 'https://horecavn.com/uploads/images/bai-viet/bi-quyet-chup-anh-do-uong-bat-mat-khong-ton-nhieu-chi-phi-3.jpg',
        },
        {
            id: 2,
            image: 'https://tomimarkets.net/wp-content/uploads/2020/08/chup-anh-do-uong-3-Tomimarkets.jpg',
        },
        {
            id: 3,
            image: 'https://www.hoteljob.vn/files/Anh-HTJ-Hong/y-tuong-trang-tri-cocktail-sieu-dep-va-an-tuong-2.jpg',
        },
        {
            id: 4,
            image: 'https://nguyenlieuphachemientay.com/wp-content/uploads/2020/09/Diem-danh-15-loai-do-uong-hot-nhat-nam-co-vy.jpg',
        },
        { id: 5, image: 'https://channel.vcmedia.vn/E5dI0y3SoVrXIOTZqSfAuvUQ4vGwqv/Image/2014/05/1_a1929.jpg' },
        {
            image: 'https://bizweb.dktcdn.net/100/236/309/files/cach-gay-chu-y-khach-den-quan-blog-d-h-1.jpg?v=1591002379869',
        },
        {
            id: 6,
            image: 'https://giadinh.mediacdn.vn/296230595582509056/2022/9/17/trasua11-1662447455936-1663375355047-16633753552311864801039.jpeg',
        },
        { id: 7, image: 'https://hotelmart.vn/uploads/2019/11/15/1270_i5dce26fc1ef09.jpg' },
        {
            id: 8,
            image: 'https://www.puncoffee.com/wp-content/uploads/2022/05/c%C3%A0-ph%C3%AA-s%E1%BB%AFa-%C4%91%C3%A1-Vi%E1%BB%87t-Nam-1024x800.jpg',
        },
        { id: 9, image: 'https://vuadiengiai.com/wp-content/uploads/2021/03/do-uong-healthy-2.jpg' },
        { id: 10, image: 'https://studiochupanhdep.com/Upload/Images/Album/do-uong-33.jpg' },
        { id: 11, image: 'https://thuvien.hocviennhiepanh.com/wp-content/uploads/Tip7_f4.jpg' },
        { id: 13, image: 'https://milanocoffee.com.vn/wp-content/uploads/2022/06/banner-cf-01-02-02-1.jpeg' },
        {
            id: 14,
            image: 'https://media.istockphoto.com/photos/cappuccino-with-coffee-beans-picture-id523167980?k=6&m=523167980&s=612x612&w=0&h=M3haXBG2oinWVAFrIqKn4XcgTPWygjVAmFn-0GZEdFM=',
        },
    ];
    return (
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            {listImg.map((Img) => (
                <div key={Img.id}>
                    <img key={Img.id} style={{ height: '500px', width: 'auto' }} alt="" src={Img.image} />
                </div>
            ))}
        </Carousel>
    );
}
export default Carousels;
