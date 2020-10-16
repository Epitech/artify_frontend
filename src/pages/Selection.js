import React, { useEffect } from 'react';
import { CustomButton, ImageCard } from '../global/components';
import { useStateValue } from '../context/StateProvider';
import { FlexContainer } from '../global/container';
import axios from 'axios';

axios.defaults.timeout = 120000;

const Selection = () => {
    const [{ global }, dsp] = useStateValue();

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
	    //console.log(global)
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/transfert`, {
                photoId: global.selectedImage.id,
                artworkId: global.selectedArtwork.id,
            }, {timeout: 120000});
	    //console.log(res)
            dsp({
                type: 'SET_RESULT_IMAGE',
                resultImage: { url: `${process.env.REACT_APP_API_URL}/results/${res.data.resultId}`, id: res.data.resultId },
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="page-container">
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
