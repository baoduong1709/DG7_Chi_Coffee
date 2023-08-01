import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-light text-center text-white">
            {/* <!-- Grid container --> */}
            <div className="container p-4 pb-0">
                {/* <!-- Section: Social media --> */}
                <section className="mb-4">
                    {/* <!-- Facebook --> */}
                    <Link
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#3b5998' }}
                        href="#!"
                        role="button"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </Link>

                    {/* <!-- Twitter --> */}
                    <Link
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#55acee' }}
                        href="#!"
                        role="button"
                    >
                        <i className="fab fa-twitter"></i>
                    </Link>

                    {/* <!-- Google --> */}
                    <Link
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#dd4b39' }}
                        href="#!"
                        role="button"
                    >
                        <i className="fab fa-google"></i>
                    </Link>

                    {/* <!-- Instagram --> */}
                    <Link
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#ac2bac' }}
                        href="#!"
                        role="button"
                    >
                        <i className="fab fa-instagram"></i>
                    </Link>

                    {/* <!-- Linkedin --> */}
                    <Link
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#0082ca' }}
                        href="#!"
                        role="button"
                    >
                        <i className="fab fa-linkedin-in"></i>
                    </Link>
                    {/* <!-- Github --> */}
                    <Link
                        className="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#333333' }}
                        href="#!"
                        role="button"
                    >
                        <i className="fab fa-github"></i>
                    </Link>
                </section>
                {/* <!-- Section: Social media --> */}
            </div>
            {/* <!-- Grid container --> */}

            {/* <!-- Copyright --> */}
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2023 Copyright:
                <Link className="text-white" to="https://mdbootstrap.com/">
                    DG7_CHI_COFFEE
                </Link>
            </div>
            {/* <!-- Copyright --> */}
        </footer>
    );
}

export default Footer;
