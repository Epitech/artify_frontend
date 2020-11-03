import React, { useEffect, useRef } from 'react';
import { CustomButton, ImageCard } from '../global/components';
import { useStateValue } from '../context/StateProvider';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { FlexContainer } from '../global/container';
import axios from 'axios';

class ComponentToPrint extends React.Component {
    render() {
        return <>{this.props.children}</>;
    }
}

const Result = () => {
    const [{ global }, dsp] = useStateValue();

    const componentRef = useRef(null);

    useEffect(() => {
        dsp({
            type: 'SET_HEADER_TITLE',
            headerTitle: 'RÉSULTAT',
        });
    }, [dsp]);

    const onReturnClick = () => {
            
        console.log(global.selectedArtwork);
        console.log(global.selectedImage);
        global.selectedArtwork = null;
        global.resultImage = null;
        dsp({
            type: 'SET_SELECTED_IMAGE',
            resultImage: null,
            selectedArtwork: null,
            selectedImage: global.selectedImage,
        });
    };

    const onChooseMail = () => {
        dsp({
            type: 'SET_SHARE_BY_MAIL',
            shareByMail: true,
        });
    };

    const displayOnScreen = async () => {
        // TODO
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/display?id=${global.resultImage.id}`);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="page-container">
            <div className="full-width flex-center flex-column">
                <div className="flex-center full-width">
                    <FlexContainer marginRight={16} width="22%">
                        <ImageCard url={global.selectedImage.url} noImageMargin />
                    </FlexContainer>
                    <FlexContainer width="22%">
                        <ImageCard url={global.selectedArtwork.url} noImageMargin />
                    </FlexContainer>
                    <FlexContainer marginLeft={16} width="22%">
                        <ReactToPrint content={() => componentRef.current} />
                        <ComponentToPrint ref={componentRef}>
                            <ImageCard url={global.resultImage.url} noImageMargin />
                        </ComponentToPrint>
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
                        text="IMPRESSION"
                        textColor="white"
                        backgroundColor="black"
                        fullWidth
                        onClick={handlePrint}
                    ></CustomButton>
                    <CustomButton
                        text="AFFICHER À L'ÉCRAN"
                        textColor="white"
                        backgroundColor="black"
                        fullWidth
                        onClick={async () => await displayOnScreen}
                    ></CustomButton>
                    <CustomButton
                        text="ENVOI PAR MAIL"
                        textColor="white"
                        backgroundColor="black"
                        noMargin
                        fullWidth
                        onClick={onChooseMail}
                    ></CustomButton>
                </div>
            </div>
        </div>
    );
};

export default Result;
