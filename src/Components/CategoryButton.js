import React from 'react';

const CategoryButton = ({on, onClick, label}) => {
    return (
        <button type="button" className={`bbs-category ${on?"on":" off"}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default CategoryButton;