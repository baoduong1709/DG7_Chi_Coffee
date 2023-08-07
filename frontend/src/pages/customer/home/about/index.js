import '~/assets/css/about.css';
import image from '~/assets/images';

function About() {
    return (
        <div className="container-section">
            <div className="section-content">
                <div className="content-row">
                    <div className="content-image">
                        <img style={{ height: '100%' }} src={image.about} alt="Về chúng tôi" />
                    </div>
                    <div className="content-text">
                        <h1 className="text-heading">Về chúng tôi</h1>
                        <p className="text">
                            CÂU CHUYỆN NÀY LÀ CỦA CHÚNG MÌNH Chi Coffee được thành lập vào năm 1999, bắt nguồn từ tình
                            yêu dành cho đất Việt cùng với cà phê và cộng đồng nơi đây. Tinh thần cộng đồng luôn chảy
                            trong ADN của mỗi người Việt mình. Ngay từ những ngày đầu tiên, mục tiêu của chúng mình là
                            có thể phục vụ và góp phần phát triển cộng đồng bằng cách siết chặt thêm sự kết nối và sự
                            gắn bó giữa người với người. Ngày hôm nay, với hàng trăm cửa hàng trên khắp Việt Nam và trên
                            Thế Giới, thứ chúng mình đem lại không chỉ dừng lại ở cà phê. Chúng mình còn là nơi để thuộc
                            về, là nơi để kết nối tất cả mọi người với nhau. Từ đó, Chi Coffee trở thành nơi dành riêng
                            cho cộng đồng.
                        </p>
                        <p className="text">
                            Trong tương lai, chúng mình sẽ luôn thấy một Việt Nam đang phát triển và một Chi Coffee
                            không ngừng cải tiến. Chi Coffee - điểm tụ họp của cộng đồng, nơi mọi người có thể kết nối
                            và gắn kết với nhau bằng tình yêu dành cho cà phê, trà và các món ăn ngon. Tại Chi Coffee,
                            chúng mình luôn sát cánh cùng bạn, chúng mình luôn ủng hộ bạn và chúng mình luôn đồng hành
                            với nhau như một cộng đồng.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
