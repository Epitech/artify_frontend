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

const Portraits = () => {
    const [columns, setColumns] = useState([[], [], []]);
    const [openOverlay, setOpenOverlay] = useState(null);
    const [{ global }, dsp] = useStateValue();
    const [loading, setLoading] = useState(global.imageStorage.length === 0 ? true : false);

    useEffect(() => {
        dsp({
            type: 'SET_HEADER_TITLE',
            headerTitle: 'PORTRAITS',
        });
    }, [dsp]);

    useEffect(() => {
        const storeAndLoadArtworks = async () => {
            const tmp = [];

            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/artworks`);

                await Promise.all(
                    res.data.artworks.map(async (image) => {
                        const item = await localforage.getItem(image.id);
                        if (!item) {
                            const b64 = await toDataURL(`${process.env.REACT_APP_API_URL}/artworks/${image.id}`);
                            localforage.setItem(image.id, b64);
                            tmp.push({
                                url: b64,
                                title: image.title,
                                subtitle: image.subtitle,
                                id: image.id,
                            });
                        } else {
                            tmp.push({
                                url: item,
                                title: image.title,
                                subtitle: image.subtitle,
                                id: image.id,
                            });
                        }
                    }),
                );
                dsp({
                    type: 'SET_ARTWORK_STORAGE',
                    artworkStorage: tmp,
                });
            } catch (e) {
                console.log(e);
            }
        };

        if (global.artworkStorage.length === 0) storeAndLoadArtworks();

        const storeAndLoadPhotos = async () => {
            const tmp = [];
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/photos`);

                await Promise.all(
                    res.data.photos.map(async (image) => {
                        const item = await localforage.getItem(image.id);
                        if (!item) {
                            const b64 = await toDataURL(`${process.env.REACT_APP_API_URL}/photos/${image.id}`);
                            localforage.setItem(image.id, b64);
                            tmp.push({
                                url: b64,
                                title: image.title,
                                subtitle: image.subtitle,
                                id: image.id,
                            });
                        } else {
                            tmp.push({
                                url: item,
                                title: image.title,
                                subtitle: image.subtitle,
                                id: image.id,
                            });
                        }
                    }),
                );
                dsp({
                    type: 'SET_IMAGE_STORAGE',
                    imageStorage: tmp.sort((x, y) => {
                        return new Date(y.title) - new Date(x.title); // Invert substractions to revert order
                    }),
                });
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        if (global.imageStorage.length === 0) storeAndLoadPhotos();

        const interval = setInterval(() => {
            storeAndLoadPhotos();
            storeAndLoadArtworks();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const tmp = [[], [], []];
        for (let i = 0; i < global.imageStorage.length; i++) tmp[i % 3].push(global.imageStorage[i]);
        setColumns(tmp);
    }, [global.imageStorage]);

    const handleClickOnCard = (image) => {
        setOpenOverlay(image);
    };

    const handleSelectImage = () => {
        dsp({
            type: 'SET_SELECTED_IMAGE',
            selectedImage: {
                url: openOverlay.url,
                title: openOverlay.title,
                subtitle: openOverlay.subtitle,
                id: openOverlay.id,
            },
        });
    };

    const handleDeletePhotos = async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/photos/${openOverlay.id}`);
            await localforage.getItem(openOverlay.id);
            window.location.href = '/';
        } catch (e) {
            console.log(e);
        }
        setOpenOverlay(null);
    };

    return (
        <div className="page-container">
            {openOverlay && (
                <OverlayWrapper
                    zIndex={2}
                    center
                    padded
                    close={() => {
                        setOpenOverlay(null);
                    }}
                >
                    <div style={{ width: '40%' }}>
                        <ImageCard
                            url={openOverlay.url}
                            onClick={(e) => e.stopPropagation()}
                            selectMode
                            maxHeight={global.windowHeight * 0.45}
                            onSelect={handleSelectImage}
                            deleteCallback={async () => await handleDeletePhotos()}
                        />
                    </div>
                </OverlayWrapper>
            )}
            {!loading ? (
                <>
                    <FlexContainer column width="33%" marginRight={16}>
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
                    <FlexContainer column width="33%">
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
                    <FlexContainer column width="33%" marginLeft={16}>
                        {columns[2].map((image) => (
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
                </>
            ) : (
                <div style={{ height: global.windowHeight * 0.8 }}>
                    <Loader active />
                </div>
            )}
        </div>
    );
};

export default Portraits;
