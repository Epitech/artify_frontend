export default (state, action) => {
    switch (action.type) {
        case 'SET_WINDOW_DIMENSION':
            return {
                ...state,
                windowWidth: action.width,
                windowHeight: action.height,
            };
        case 'SET_HEADER_TITLE':
            return {
                ...state,
                headerTitle: action.headerTitle,
            };
        case 'SET_SCREEN_NUMBER':
            return {
                ...state,
                settings: { ...state.settings, screenNumberValue: action.screenNumberValue },
            };
        case 'SET_DISPLAY':
            return {
                ...state,
                settings: { ...state.settings, displayValue: action.displayValue },
            };
        case 'SET_PRINT_MAILER':
            return {
                ...state,
                settings: { ...state.settings, printMailerValue: action.printMailerValue },
            };
        case 'SET_CLOUD_LOCAL':
            return {
                ...state,
                settings: { ...state.settings, cloudLocalValue: action.cloudLocalValue },
            };
        case 'SET_EVENT_NAME':
            return {
                ...state,
                settings: { ...state.settings, eventName: action.eventName },
            };
        case 'SET_CLIENT_NAME':
            return {
                ...state,
                settings: { ...state.settings, clientName: action.clientName },
            };
        case 'SET_EVENT_DATE':
            return {
                ...state,
                settings: { ...state.settings, eventDate: action.eventDate },
            };
        case 'SET_CLIENT_URL':
            return {
                ...state,
                settings: { ...state.settings, clientLogoUrl: action.clientLogoUrl },
            };
        case 'SET_SELECTED_IMAGE':
            return {
                ...state,
                selectedImage: action.selectedImage,
            };
        case 'SET_SELECTED_ARTWORK':
            return {
                ...state,
                selectedArtwork: action.selectedArtwork,
            };
        case 'SET_RESULT_IMAGE':
            return {
                ...state,
                resultImage: action.resultImage,
            };
        case 'SET_SHARE_BY_MAIL':
            return {
                ...state,
                shareByMail: action.shareByMail,
            };
        case 'SET_ARTWORK_STORAGE':
            return {
                ...state,
                artworkStorage: action.artworkStorage,
            };
        case 'SET_IMAGE_STORAGE':
            return {
                ...state,
                imageStorage: action.imageStorage,
            };
        case 'SET_RESULT_STORAGE':
            return {
                ...state,
                resultStorage: action.resultStorage,
            };
        case 'SET_GALLERY_SELECTION':
            return {
                ...state,
                resultImage: action.resultImage,
                selectedArtwork: action.selectedArtwork,
                selectedImage: action.selectedImage,
            };
        default:
            return state;
    }
};
