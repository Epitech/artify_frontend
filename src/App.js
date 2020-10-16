import React, { useEffect, useState } from 'react';
import { Header } from './global/components';
import { useStateValue } from './context/StateProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Portraits, Artworks, Selection, Result, Share, Gallery } from './pages';
import { OverlayWrapper } from './global/container';
import Settings from './pages/settings/Settings';
import axios from 'axios';

const App = () => {
    const [{ global }, dsp] = useStateValue();
    const [openParams, setOpenParams] = useState(false);
    const [openGallery, setOpenGallery] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            const displayEnum = {
                1: 'SOLO',
                2: 'DYPTIQUE',
                3: 'TRYPTIQUE',
            };
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/settings`);
		console.log(res);
                dsp({
                    type: 'SET_DISPLAY',
                    displayValue: displayEnum[res.data.displayValue],
                });
            } catch (e) {
                console.log(e);
            }
        };
        fetchSettings();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            dsp({
                type: 'SET_WINDOW_DIMENSION',
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dsp]);

    return (
        <Router>
            <Header setOpenParams={() => setOpenParams(!openParams)} setOpenGallery={setOpenGallery} openGallery={openGallery} />
            {openParams && (
                <OverlayWrapper
                    padded
                    zIndex={3}
                    close={() => {
                        setOpenParams(false);
                    }}
                >
                    <Settings />
                </OverlayWrapper>
            )}
            <Switch>
                <Route exact path="/">
                    {!openGallery && !global.selectedImage && !global.selectedArtwork && !global.resultImage && <Portraits />}
                    {global.selectedImage && !global.selectedArtwork && !global.resultImage && <Artworks />}
                    {global.selectedImage && global.selectedArtwork && !global.resultImage && <Selection />}
                    {global.resultImage && !global.shareByMail && <Result />}
                    {global.resultImage && global.shareByMail && <Share />}
                    {openGallery && <Gallery setOpenGallery={setOpenGallery} />}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
