import React, { useRef, useState, useEffect } from 'react';
import { Form, Image } from 'semantic-ui-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useStateValue } from '../../context/StateProvider';
import fr from 'date-fns/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomButton } from '../../global/components';
import localforage from 'localforage';
import axios from 'axios';

registerLocale('fr', fr);

const OptionsSelector = ({ options, value, onSelect }) => {
    return (
        <div className="flex option-selector-box">
            {options.map((option, i) => {
                return (
                    <div
                        onClick={() => onSelect(option)}
                        key={i}
                        className="flex-center pointer"
                        style={{
                            backgroundColor: option === value ? 'black' : 'white',
                            color: option === value ? 'white' : 'black',
                            marginRight: i === 0 ? 10 : null,
                            marginLeft: i === 2 ? 10 : null,
                        }}
                    >
                        {option}
                    </div>
                );
            })}
        </div>
    );
};

class DateInput extends React.PureComponent {
    state = { readOnly: false };

    render() {
        return (
            <input
                {...this.props}
                onFocus={() => this.setState({ readOnly: true })}
                onBlur={() => this.setState({ readOnly: false })}
                readOnly={this.state.readOnly}
            />
        );
    }
}

const Settings = () => {
    const [{ global }, dsp] = useStateValue();

    const [selectedFileName, setSelectedFileName] = useState('');

    const datePickerRef = useRef(null);
    const fileUrlInput = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const onEventDateChange = (date) => {
        dsp({
            type: 'SET_EVENT_DATE',
            eventDate: date,
        });
    };

    const onClientNameChange = (e) => {
        dsp({
            type: 'SET_CLIENT_NAME',
            clientName: e.target.value,
        });
    };

    const onClientLogoUrlChange = (e) => {
        console.log(e.target.files[0]);

        setSelectedFileName(e.target.files[0].name);
    };

    const onEventNameChange = (e) => {
        dsp({
            type: 'SET_EVENT_NAME',
            eventName: e.target.value,
        });
    };

    const onNumberScreenChange = (value) => {
        dsp({
            type: 'SET_SCREEN_NUMBER',
            screenNumberValue: value,
        });
    };

    const onDisplayChange = async (value) => {
        const displayEnum = {
            SOLO: 1,
            DYPTIQUE: 2,
            TRYPTIQUE: 3,
        };

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/settings`, { displayValue: displayEnum[value] });
        } catch (e) {
            console.log(e);
        }
        dsp({
            type: 'SET_DISPLAY',
            displayValue: value,
        });
    };

    const onPrintMailerChange = (value) => {
        dsp({
            type: 'SET_PRINT_MAILER',
            printMailerValue: value,
        });
    };

    const handleDateChangeRaw = (e) => {
        e.preventDefault();
    };

    const clearStorage = () => {
        localforage.clear();
    };

    return (
        <div
            className="card settings-box"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <Form className="flex-column-space full-height" style={{ overscrollBehavior: 'contain' }}>
                <Form.Field>
                    <label className="form-label">NOM DE L'ÉVÈNEMENT</label>
                    <input value={global.settings.eventName} type="text" placeholder="Nom de l'évènement" onChange={onEventNameChange} />
                </Form.Field>
                <Form.Field>
                    <label className="form-label">DATE DE L'ÉVÈNEMENT</label>
                    <div style={{ position: 'relative' }}>
                        <Image
                            src="svg/calendar.svg"
                            style={{ position: 'absolute', right: 10, top: 10, zIndex: 1 }}
                            onClick={() => {
                                datePickerRef.current.setOpen(true);
                            }}
                        />
                        <DatePicker
                            ref={datePickerRef}
                            locale="fr"
                            dateFormat="dd/MM/yyyy"
                            selected={global.settings.eventDate}
                            onChange={(date) => onEventDateChange(date)}
                            className="calendar-input"
                            onChangeRaw={handleDateChangeRaw}
                            customInput={<DateInput />}
                        />
                    </div>
                </Form.Field>
                <Form.Field>
                    <label className="form-label">NOM DU CLIENT</label>
                    <input type="text" placeholder="Nom du client" value={global.settings.clientName} onChange={onClientNameChange} />
                </Form.Field>
                <Form.Field>
                    <label className="form-label">LOGO DU CLIENT</label>
                    <div style={{ position: 'relative' }}>
                        <Image
                            src="svg/file.svg"
                            style={{ position: 'absolute', right: 10, top: 10, zIndex: 2 }}
                            onClick={() => fileUrlInput.current.click()}
                        />
                        <input
                            type="text"
                            onClick={() => fileUrlInput.current.click()}
                            value={selectedFileName}
                            placeholder="Logo du client"
                            readOnly
                        />
                        <input
                            style={{ visibility: 'hidden', position: 'absolute' }}
                            ref={fileUrlInput}
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/png, image/jpeg"
                            onChange={onClientLogoUrlChange}
                        ></input>
                    </div>
                </Form.Field>
                <Form.Field>
                    <label className="form-label">NOMBRE D'ÉCRANS</label>
                    <OptionsSelector
                        options={global.settings.screenNumberOptions}
                        value={global.settings.screenNumberValue}
                        onSelect={onNumberScreenChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label className="form-label">AFFICHAGE</label>
                    <OptionsSelector
                        options={global.settings.displayOptions}
                        value={global.settings.displayValue}
                        onSelect={onDisplayChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label className="form-label">IMPRESSION / ENVOI PAR MAIL</label>
                    <OptionsSelector
                        options={global.settings.printMailerOptions}
                        value={global.settings.printMailerValue}
                        onSelect={onPrintMailerChange}
                    />
                </Form.Field>
                <Form.Field style={{ marginBottom: 10 }}>
                    <label className="form-label">VIDER LE CACHE</label>
                    <CustomButton
                        text="VIDER LE CACHE"
                        textColor="white"
                        backgroundColor="black"
                        fullWidth
                        noMargin
                        onClick={clearStorage}
                        height="40px"
                    ></CustomButton>
                </Form.Field>
            </Form>
        </div>
    );
};

export default Settings;
