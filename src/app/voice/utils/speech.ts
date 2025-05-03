"use client";

export const startListening = (
    lang: string = "id-ID",
    onResult: (text: string) => void,
    onError: (error: string) => void
) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        onError("Browser tidak mendukung");
        return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
        const text = event.results[event.results.length - 1][0].transcript;
        onResult(text.trim());
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        onError(`Error: ${event.error}`);
    };

    recognition.start();
    return recognition;
};