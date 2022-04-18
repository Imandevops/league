import React, { Fragment } from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Courses from './Courses';
import Infografic from './Infografic';
import MainLogo from './MainLogo';
import News from './News';

const Home = () => {
    return (
        <Fragment>
            <Header />
            <MainLogo />
            <News />
            <Courses />
            <Infografic />
            <Footer />
        </Fragment>
    );
}

export default Home;