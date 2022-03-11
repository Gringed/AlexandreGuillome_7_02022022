import React from 'react';
import { useSelector } from 'react-redux';
import AsideNav from '../AsideNav';
import UploadImg from './UploadImg';

const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer)

    return (
        <div className='profil-container'>
            <AsideNav />
            <h1>{userData.firstName} {userData.lastName}</h1>
            <div className='update-container'>
                <div className='left-part'>
                <h3>Photo de profil</h3>
                <img src={userData.avatar} alt='User Profil' />
                {/* <p>{errors.maxSize}</p>
                <p>{errors.format}</p>   */}
                <UploadImg /> 
                </div>    
            </div>
        </div>
    );
};

export default UpdateProfil;