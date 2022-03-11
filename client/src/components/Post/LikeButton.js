import React, { useEffect, useState } from 'react';

const LikeButton = ({likes}) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(likes){

        }
    })

    return (
        <div>
            Like
        </div>
    );
};

export default LikeButton;