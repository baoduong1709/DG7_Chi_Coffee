import { Link } from 'react-router-dom';
import '~/assets/css/notFound.css';

function NotFound() {
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center" style={{ width: '100%' }}>
                            <div className="four_zero_four_bg">
                                <h1 className="text-center text-danger fw-bold   ">404</h1>
                            </div>
                            <div className="contant_box_404">
                                <Link to="/" className="link_404 bg-danger text-bg-danger">
                                    Trở Lại
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
