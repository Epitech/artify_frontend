import React, { useEffect, useState } from 'react';
import { CustomButton, ImageCard } from '../global/components';
import { useStateValue } from '../context/StateProvider';
import { FlexContainer, OverlayWrapper } from '../global/container';
import axios from 'axios';
import { Image } from 'semantic-ui-react';

const Selection = () => {
    const [{ global }, dsp] = useStateValue();
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        dsp({
            type: 'SET_HEADER_TITLE',
            headerTitle: 'SÉLÉCTION',
        });
    }, [dsp]);

    const onReturnClick = () => {
        dsp({
            type: 'SET_SELECTED_ARTWORK',
            selectedArtwork: null,
        });
    };

    const onTransferLaunch = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/transfert`, {
                photoId: global.selectedImage.id,
                artworkId: global.selectedArtwork.id,
            });
            setOpenPopup(true);
        } catch (e) {
            console.log(e);
        }
    };

    // RETURN BUTTON FROM POPUP
    return (
        <div className="page-container">
            {openPopup && (
                <OverlayWrapper
                    zIndex={2}
                    center
                    close={() => {
                        setOpenPopup(null);
                    }}
                >
                    <div className="card" style={{ width: '40%', backgroundColor: 'white' }}>
                        <Image className="basic-image" src={'/transfer.jpg'} style={{ marginBottom: 20, objectFit: 'cover' }} />
                        <div style={{ height: 80 }}>
                            <CustomButton
                                text="RETOUR"
                                textColor="white"
                                backgroundColor="black"
                                noMargin
                                fullWidth
                                height={80}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.location.href = '/';
                                }}
                            ></CustomButton>
                        </div>
                    </div>
                </OverlayWrapper>
            )}
            <div className="flex-center flex-column" style={{ width: '70%' }}>
                <div className="flex-center full-width">
                    <FlexContainer marginRight={16} width="50%">
                        <ImageCard url={global.selectedImage.url} noImageMargin />
                    </FlexContainer>
                    <FlexContainer width="50%">
                        <ImageCard url={global.selectedArtwork.url} noImageMargin />
                    </FlexContainer>
                </div>
                <div className="flex-center full-width">
                    <CustomButton
                        square
                        icon="svg/leftarrow.svg"
                        textColor="black"
                        backgroundColor="white"
                        onClick={onReturnClick}
                    ></CustomButton>
                    <CustomButton
                        text="LANCER LE TRANSFERT"
                        textColor="white"
                        backgroundColor="black"
                        noMargin
                        fullWidth
                        onClick={async () => await onTransferLaunch()}
                    ></CustomButton>
                </div>
            </div>
        </div>
    );
};

export default Selection;
