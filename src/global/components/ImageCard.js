/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useStateValue } from '../../context/StateProvider';
import { Image } from 'semantic-ui-react';
import { CustomButton } from '.';

const ImageCard = ({
    title,
    subtitle,
    url,
    clickable = false,
    onClick = null,
    selectMode = false,
    noImageMargin,
    doubleImage,
    height,
    maxHeight,
    onSelect,
    deleteCallback,
}) => {
    const [deleteImage, setDeleteImage] = useState(false);
    const [{ global }, dsp] = useStateValue();

    const handleDeleteImage = () => {
        deleteCallback();
    };

    return (
        <div className={`card ${clickable ? 'pointer' : ''}`} onClick={onClick}>
            {doubleImage ? (
                <div className="flex-center">
                    <Image
                        className="basic-image"
                        src={doubleImage[0].url}
                        style={{
                            margin: noImageMargin ? 0 : null,
                            width: '50%',
                            marginRight: 8,
                            height,
                        }}
                    />
                    <Image
                        className="basic-image"
                        src={doubleImage[1].url}
                        style={{
                            margin: noImageMargin ? 0 : null,
                            width: '50%',
                            marginLeft: 8,
                            height,
                        }}
                    />
                </div>
            ) : !height && !maxHeight ? (
                <Image src={url} style={{ margin: noImageMargin ? 0 : null }} />
            ) : (
                <Image
                    className="basic-image"
                    src={url}
                    style={{ margin: noImageMargin ? 0 : null, height, objectFit: 'cover', maxHeight }}
                />
            )}
            {!selectMode ? (
                <>
                    {title && <h2>{title}</h2>}
                    {subtitle && <h3>{subtitle}</h3>}
                </>
            ) : (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    {!deleteImage ? (
                        <>
                            <CustomButton
                                square
                                icon="svg/trash.svg"
                                textColor="red"
                                backgroundColor="#FFE6E6"
                                onClick={(e) => {
                                    setDeleteImage(true);
                                    e.stopPropagation();
                                }}
                            ></CustomButton>
                            <CustomButton
                                text="SÉLÉCTIONNER"
                                textColor="white"
                                backgroundColor="black"
                                noMargin
                                fullWidth
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect();
                                }}
                            ></CustomButton>
                        </>
                    ) : (
                        <CustomButton
                            text="SUPPRIMER"
                            textColor="red"
                            backgroundColor="#FFE6E6"
                            noMargin
                            fullWidth
                            onClick={handleDeleteImage}
                        ></CustomButton>
                    )}
                </div>
            )}
        </div>
    );
};
export default ImageCard;
