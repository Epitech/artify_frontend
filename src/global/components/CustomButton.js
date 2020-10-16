import React from 'react';
import { Image } from 'semantic-ui-react';

const CustomButton = ({ height = 80, onClick, square, icon, text, textColor, backgroundColor, noMargin, fullWidth, noBold }) => {
    return (
        <div
            onClick={onClick}
            className="flex-center pointer button"
            style={{
                marginRight: noMargin ? 0 : 16,
                height,
                width: square ? 80 : 'auto',
                backgroundColor: backgroundColor,
                flex: fullWidth ? 1 : null,
            }}
        >
            <span className="text-button" style={{ color: textColor, fontWeight: noBold ? 300 : null }}>
                {text}
            </span>
            {icon && <Image src={icon} width="30px" />}
        </div>
    );
};

export default CustomButton;
