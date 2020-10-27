/* eslint-disable no-unused-vars */

import React from 'react';
import { Image } from 'semantic-ui-react';
import { useStateValue } from '../../context/StateProvider';

const Header = ({ setOpenParams, setOpenGallery }) => {
    const [{ global }, dsp] = useStateValue();

    const homeRedirect = () => {
        setOpenGallery(false);
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
        window.location.href = '/';
    };

    const onReturnClick = () => {
        switch (global.headerTitle) {
            case 'ENVOI PAR MAIL':
                dsp({
                    type: 'SET_SHARE_BY_MAIL',
                    resultImage: false,
                });
                break;
            case 'RÉSULTAT':
                // dsp({
                //     type: 'SET_RESULT_IMAGE',
                //     resultImage: null,
                // });
                setOpenGallery(true);
                break;
            case 'SÉLÉCTION':
                dsp({
                    type: 'SET_SELECTED_ARTWORK',
                    selectedArtwork: null,
                });
                break;
            case 'ŒUVRES':
                dsp({
                    type: 'SET_SELECTED_IMAGE',
                    selectedImage: null,
                });
                break;
            case 'GALERIE':
                homeRedirect();
                break;
            default:
                break;
        }
    };

    return (
        <>
            <header className="header-style">
                {global.headerTitle !== 'PORTRAITS' && (
                    <Image className="pointer" src="svg/left-arrow.svg" width="30px" style={{ marginRight: 20 }} onClick={onReturnClick} />
                )}
                <h1>{global.headerTitle}</h1>
                <div className="flex" style={{ height: 78, maxHeight: 78 }}>
                    <Image style={{ marginRight: 40 }} size="small" className="pointer" src="LogoArtify.png" onClick={homeRedirect}></Image>
                    <Image className="pointer" size="mini" src="svg/gallery.svg" onClick={() => setOpenGallery(true)} />
                    <Image className="pointer" size="mini" style={{ marginLeft: 40 }} src="svg/gear.svg" onClick={setOpenParams} />
                </div>
            </header>
            <div className="header-padding"></div>
        </>
    );
};

export default Header;
