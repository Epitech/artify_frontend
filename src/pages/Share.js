import React, { useState, useEffect } from 'react';
import { CustomButton, ImageCard } from '../global/components';
import { useStateValue } from '../context/StateProvider';
import { Checkbox, Form } from 'semantic-ui-react';
import { FlexContainer } from '../global/container';

const MailForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);

    console.log(firstName, lastName, email);

    return (
        <Form className="flex-column-space full-height" style={{ padding: 32 }}>
            <Form.Field>
                <label className="form-label">PRÉNOM</label>
                <input type="text" placeholder="Prénom" onChange={(e) => setFirstName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label className="form-label">NOM</label>
                <input type="text" placeholder="Nom" onChange={(e) => setLastName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label className="form-label">EMAIL</label>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <Checkbox
                    checked={checkbox1}
                    onChange={(e, d) => setCheckbox1(!checkbox1)}
                    label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas, nisi vel tempus ultricies, velit odio ultricies arcu, "
                />
            </Form.Field>
            <Form.Field>
                <Checkbox
                    checked={checkbox2}
                    onChange={(e, d) => setCheckbox2(!checkbox2)}
                    label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas, nisi vel tempus ultricies, velit odio ultricies arcu, "
                />
            </Form.Field>
        </Form>
    );
};

const Share = () => {
    const [{ global }, dsp] = useStateValue();

    useEffect(() => {
        dsp({
            type: 'SET_HEADER_TITLE',
            headerTitle: 'ENVOI PAR MAIL',
        });
    }, [dsp]);

    const onReturnClick = () => {
        dsp({
            type: 'SET_SHARE_BY_MAIL',
            resultImage: false,
        });
    };

    return (
        <div className="page-container">
            <div className="full-width flex-center flex-column">
                <div className="flex-center">
                    <FlexContainer width="60%">
                        <ImageCard doubleImage={[global.selectedImage, global.resultImage]} noImageMargin />
                    </FlexContainer>
                    <FlexContainer height="100%" width="40%" marginLeft={16}>
                        <MailForm />
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
                    <CustomButton text="ENVOYER" textColor="white" backgroundColor="black" fullWidth onClick={null}></CustomButton>
                </div>
            </div>
        </div>
    );
};

export default Share;
