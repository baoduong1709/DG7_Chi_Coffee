import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

function Carousels() {
    let listImg = [
        {
            image: 'https://horecavn.com/uploads/images/bai-viet/bi-quyet-chup-anh-do-uong-bat-mat-khong-ton-nhieu-chi-phi-3.jpg',
        },
        {
            image: 'https://tomimarkets.net/wp-content/uploads/2020/08/chup-anh-do-uong-3-Tomimarkets.jpg',
        },
        {
            image: 'https://www.hoteljob.vn/files/Anh-HTJ-Hong/y-tuong-trang-tri-cocktail-sieu-dep-va-an-tuong-2.jpg',
        },
        {
            image: 'https://www.elleman.vn/wp-content/uploads/2019/06/25/%C4%91o%CC%82%CC%80-uo%CC%82%CC%81ng-ngon-hi%CC%80nh-a%CC%89nh-ca%CC%81c-loa%CC%A3i-cocktail-kha%CC%81c-nhau.jpg',
        },
        {
            image: 'https://channel.vcmedia.vn/E5dI0y3SoVrXIOTZqSfAuvUQ4vGwqv/Image/2014/05/1_a1929.jpg',
        },
        {
            image: 'https://bizweb.dktcdn.net/100/236/309/files/cach-gay-chu-y-khach-den-quan-blog-d-h-1.jpg?v=1591002379869',
        },
        {
            image: 'https://giadinh.mediacdn.vn/296230595582509056/2022/9/17/trasua11-1662447455936-1663375355047-16633753552311864801039.jpeg',
        },
        {
            image: 'https://hotelmart.vn/uploads/2019/11/15/1270_i5dce26fc1ef09.jpg',
        },
        {
            image: 'https://www.puncoffee.com/wp-content/uploads/2022/05/c%C3%A0-ph%C3%AA-s%E1%BB%AFa-%C4%91%C3%A1-Vi%E1%BB%87t-Nam-1024x800.jpg',
        },
        {
            image: 'https://vuadiengiai.com/wp-content/uploads/2021/03/do-uong-healthy-2.jpg',
        },
        {
            image: 'https://studiochupanhdep.com/Upload/Images/Album/do-uong-33.jpg',
        },
        {
            image: 'https://thuvien.hocviennhiepanh.com/wp-content/uploads/Tip7_f4.jpg',
        },
        {
            image: 'https://milanocoffee.com.vn/wp-content/uploads/2022/06/banner-cf-01-02-02-1.jpeg',
        },
        {
            image: 'https://media.istockphoto.com/photos/cappuccino-with-coffee-beans-picture-id523167980?k=6&m=523167980&s=612x612&w=0&h=M3haXBG2oinWVAFrIqKn4XcgTPWygjVAmFn-0GZEdFM=',
        },
    ];
    return (
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            {listImg.map((Img) => (
                <div>
                    <img key={Img.image} style={{ height: '500px', width: 'auto' }} alt="" src={Img.image} />
                </div>
            ))}
        </Carousel>
    );
}
export default Carousels;
