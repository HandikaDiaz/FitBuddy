declare global {
    interface Window {
        SpeechRecognition: typeof SpeechRecognition;
        webkitSpeechRecognition: typeof SpeechRecognition;
    }

    interface SpeechRecognition extends EventTarget {
        new(): SpeechRecognition;
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        start(): void;
        stop(): void;
        abort(): void;
        onresult: (event: SpeechRecognitionEvent) => void;
        onerror: (event: SpeechRecognitionErrorEvent) => void;
    }

    interface SpeechRecognitionEvent {
        results: SpeechRecognitionResultList;
    }

    interface SpeechRecognitionErrorEvent extends Event {
        error: string;
        message: string;
    }
}

export { };
