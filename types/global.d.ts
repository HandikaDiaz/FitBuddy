export { };

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }

    interface SpeechRecognitionEvent extends Event {
        results: SpeechRecognitionResultList;
        error: SpeechRecognitionError;
    }
}
