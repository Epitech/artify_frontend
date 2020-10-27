export default {
    global: {
        windowWidth: null,
        windowHeight: null,

        headerTitle: null,

        imageStorage: [],
        artworkStorage: [],
        resultStorage: [],

        selectedImage: null,
        selectedArtwork: null,
        resultImage: null,

        shareByMail: false,

        settings: {
            eventName: '',
            eventDate: Date.now(),
            clientName: '',
            clientLogoUrl: '',
            screenNumberOptions: ['1', '2', '3'],
            screenNumberValue: '1',
            displayOptions: ['SOLO', 'DYPTIQUE', 'TRYPTIQUE'],
            displayValue: 'SOLO',
            printMailerOptions: ['SOLO', 'DYPTIQUE', 'TRYPTIQUE'],
            printMailerValue: 'SOLO',
            cloudLocalOptions: ['CLOUD', 'LOCAL'],
            cloudLocalValue: 'CLOUD',
            mailerPrinter: '1',
        },
    },
};
