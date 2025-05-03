"use client";

// let isSpeaking = false;
// let speechQueue: string[] = [];

export const speak = (text: string): Promise<void> => {
    return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "id-ID";
        utterance.onend = () => resolve();
        window.speechSynthesis.speak(utterance);
    });
};

// const processQueue = async (lang: string, resolve: () => void, reject: (e: Error) => void) => {
//     if (isSpeaking || speechQueue.length === 0) return;

//     isSpeaking = true;
//     const text = speechQueue.shift()!;
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = lang;

//     utterance.onend = utterance.onerror = () => {
//         isSpeaking = false;
//         window.speechSynthesis.cancel();
//         processQueue(lang, resolve, reject);
//     };

//     try {
//         window.speechSynthesis.speak(utterance);
//         resolve();
//     } catch (e) {
//         reject(e as Error);
//     }
// };

export const cancelSpeech = () => {
    window.speechSynthesis.cancel();
};