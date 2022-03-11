import React from 'react';
import { NavLink } from 'react-router-dom';

const AsideNav = () => {
    return (
        <div className='left-nav-container'>
            <div className='icons'>
                <NavLink to='/' activeClassName="active-left-nav">
                    <img src='./img/icons/home.svg' alt='home' />
                </NavLink>
                <br />
                <NavLink to='/trending' activeClassName="active-left-nav">
                    <img src='./img/icons/rocket.svg' alt='rocket' />
                </NavLink>
                <br />
                <NavLink to='/profil' activeClassName="active-left-nav">
                    <img src='./img/icons/user.svg' alt='user' />
                </NavLink>
            </div>
        </div>
    );
};

export default AsideNav;