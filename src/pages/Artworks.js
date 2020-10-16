import React, { useState, useEffect } from 'react';
import { CustomButton, ImageCard } from '../global/components';
import { useStateValue } from '../context/StateProvider';
import { FlexContainer } from '../global/container';

const Artworks = () => {
    const [{ global }, dsp] = useStateValue();
    const [columns, setColumns] = useState([[], []]);

    const handleClickOnCard = (image) => {
        dsp({
            type: 'SET_SELECTED_ARTWORK',
            selectedArtwork: image,
        });
    };

    const onReturnClick = () => {
        dsp({
            type: 'SET_SELECTED_IMAGE',
            selectedImage: null,
        });
    };

    useEffect(() => {
        dsp({
            type: 'SET_HEADER_TITLE',
            headerTitle: 'ŒUVRES',
        });
    }, [dsp]);

    useEffect(() => {
        const tmp = [[], []];
        for (let i = 0; i < global.artworkStorage.length; i++) tmp[i % 2].push(global.artworkStorage[i]);
        setColumns(tmp);
    }, [global.artworkStorage]);
//    console.log(global.artworkStorage)
    return (
        <div className="page-container">
            <div className="flex-column" style={{ width: '30%', position: 'fixed', left: 32 }}>
                <ImageCard url={global.selectedImage.url} noImageMargin maxHeight={global.windowHeight * 0.65} />
                <CustomButton
                    onClick={onReturnClick}
                    text="REVENIR AUX PORTRAITS"
                    textColor="black"
                    noBold
                    backgroundColor="white"
                    noMargin
                    height={80}
                />
            </div>
            <FlexContainer column marginRight={16} width="33%" />
            <FlexContainer column width="33%">
                {columns[0].map((image) => (
                    <ImageCard
                        key={image.id}
                        title={image.title}
                        subtitle={image.subtitle}
                        url={image.url}
                        clickable
                        onClick={() => handleClickOnCard(image)}
                    />
                ))}
            </FlexContainer>
            <FlexContainer column width="33%" marginLeft={16}>
                {columns[1].map((image) => (
                    <ImageCard
                        key={image.id}
                        title={image.title}
                        subtitle={image.subtitle}
                        url={image.url}
                        clickable
                        onClick={() => handleClickOnCard(image)}
                    />
                ))}
            </FlexContainer>
        </div>
    );
};

export default Artworks;
