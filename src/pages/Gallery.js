import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { ImageCard } from '../global/components';
import { useStateValue } from '../context/StateProvider';
import { FlexContainer, OverlayWrapper } from '../global/container';
import localforage from 'localforage';
import axios from 'axios';

const toDataURL = async (url) =>
    fetch(url)
        .then((response) => response.blob())
        .then(
            (blob) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                }),
        );

const Gallery = ({ setOpenGallery }) => {
    const [columns, setColumns] = useState([[], [], []]);
    const [openOverlay, setOpenOverlay] = useState(null);
    const [{ global }, dsp] = useStateValue();
    const [loading, setLoading] = useState(global.resultStorage.length === 0 ? true : false);

    useEffect(() => {
        dsp({
            type: 'SET_HEADER_TITLE',
            headerTitle: 'GALERIE',
        });

        dsp({
            type: 'SET_SELECTED_IMAGE',
            selectedImage: null,
        });
        dsp({
            type: 'SET_SELECTED_ARTWORK',
            selectedArtwork: null,
        });
        dsp({
            type: 'SET_RESULT_IMAGE',
            selectedImage: null,
        });
    }, [dsp]);

    useEffect(() => {
        const storeAndLoadResults = async () => {
            const tmp = [];
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/results`);

                console.log(res);

                await Promise.all(
                    res.data.results.map(async (image) => {
                        const item = await localforage.getItem(image.id);
                        if (!item) {
                            console.log(image.id);
                            const b64 = await toDataURL(`${process.env.REACT_APP_API_URL}/results/${image.id}`);
                            localforage.setItem(image.id, b64);
                            tmp.push({
                                resultUrl: b64,
                                id: image.id,
                                title: image.title,
                                subtitle: image.subtitle, 
                            });
                        } else {
                            console.log(image.id);
                            tmp.push({
                                resultUrl: item,
                                id: image.id,
                                title: image.title,
                                subtitle: image.subtitle, 
                            });
                        }
                    }),
                );
                dsp({
                    type: 'SET_RESULT_STORAGE',
                    resultStorage: tmp.sort((x, y) => {
                        return new Date(y.title) - new Date(x.title); // Invert substractions to revert order
                    }),
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        if (global.resultStorage.length === 0) storeAndLoadResults();
        const interval = setInterval(() => {
            storeAndLoadResults();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const tmp = [[], [], []];
        for (let i = 0; i < global.resultStorage.length; i++) tmp[i % 3].push(global.resultStorage[i]);
        setColumns(tmp);
    }, [global.resultStorage]);

    const handleSelectImage = async (result) => {
        console.log(result);
        const ids = result.id.split('_');
        const artworkId = ids[0];
        const photoId = ids[1];
        console.log(ids);
        console.log(artworkId);
        console.log(photoId);

        try {
            const photoList = await axios.get(`${process.env.REACT_APP_API_URL}/photos`);
            const artworkList = await axios.get(`${process.env.REACT_APP_API_URL}/artworks`);
            const photo = photoList.data.photos.find((elem) => elem.id === photoId);
            const artwork = artworkList.data.artworks.find((elem) => elem.id === artworkId);

            dsp({
                type: 'SET_GALLERY_SELECTION',
                resultImage: {
                    id: result.id,
                    url: result.resultUrl,
                    title: result.title,
                    subtitle: result.subtitle,
                },
                selectedArtwork: {
                    id: artworkId,
                    url: `${process.env.REACT_APP_API_URL}/artworks/${artworkId}`,
                    title: artwork.title,
                    subtitle: artwork.subtitle,
                },
                selectedImage: {
                    url: `${process.env.REACT_APP_API_URL}/photos/${photoId}`,
                    title: photo.title,
                    subtitle: photo.subtitle,
                },
            });
            setOpenGallery(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handleClickOnCard = (image) => {
        console.log('IMAGE = ', image);
        setOpenOverlay(image);
    };

    return (
        <div className="page-container">
            {/* {openOverlay && (
                <OverlayWrapper
                    zIndex={2}
                    center
                    close={() => {
                        setOpenOverlay(null);
                    }}
                >
                    <div style={{ width: '40%' }}>
                        <ImageCard
                            url={openOverlay.resultUrl}
                            selectMode
                            maxHeight={global.windowHeight * 0.45}
                            onSelect={async () => await handleSelectImage()}
                        />
                    </div>
                </OverlayWrapper>
            )} */}
            {!loading ? (
                <>
                    <FlexContainer column width="22%" marginRight={16} >
                        {columns[0].map((image) => (
                            <ImageCard
                                key={image.id}
                                url={image.resultUrl}
                                title={image.title}
                                subtitle={image.subtitle}
                                clickable
                                onClick={() => handleSelectImage(image)}
                            />
                        ))}
                    </FlexContainer>
                    <FlexContainer column width="22%">
                        {columns[1].map((image) => (
                            <ImageCard
                                key={image.id}
                                url={image.resultUrl}
                                title={image.title}
                                subtitle={image.subtitle}
                                clickable
                                onClick={() => handleSelectImage(image)}
                            />
                        ))}
                    </FlexContainer>
                    <FlexContainer column width="22%" marginLeft={16}>
                        {columns[2].map((image) => (
                            <ImageCard
                                key={image.id}
                                url={image.resultUrl}
                                title={image.title}
                                subtitle={image.subtitle}
                                clickable
                                onClick={() => handleSelectImage(image)}
                            />
                        ))}
                    </FlexContainer>
                </>
            ) : (
                <div style={{ height: global.windowHeight * 0.8 }}>
                    <Loader active />
                </div>
            )}
        </div>
    );
};

export default Gallery;
