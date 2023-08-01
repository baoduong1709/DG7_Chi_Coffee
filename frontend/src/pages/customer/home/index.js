import React from 'react';
import { Fragment } from 'react';
import Carousel from './carousel';
import About from './about';
import Product from './feartureProduct';

function Home() {
    return (
        <Fragment>
            <Carousel />
            <About />
            <Product />
        </Fragment>
    );
}

export default Home;
