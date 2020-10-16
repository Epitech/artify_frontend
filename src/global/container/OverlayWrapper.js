import React from 'react';

const OverlayWrapper = ({ close, children, center, padded, zIndex }) => {
    return (
        <div
            className={`overlay ${center ? 'flex-center' : null} ${padded ? 'padded-overlay' : null}`}
            onClick={close}
            style={{ zIndex: zIndex }}
        >
            {children}
        </div>
    );
};

export default OverlayWrapper;
