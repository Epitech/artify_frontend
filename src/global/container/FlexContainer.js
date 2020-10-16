import React from 'react';

const FlexContainer = ({ children, marginRight, marginLeft, width, column, height }) => {
    return (
        <div className={column ? 'flex-column' : null} style={{ marginRight, marginLeft, width, height }}>
            {children}
        </div>
    );
};

export default FlexContainer;
