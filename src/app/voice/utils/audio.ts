"use client";

let isSpeaking = false;
let speechQueue: string[] = [];

export const speak = async (text: string, lang: string = "id-ID"): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!('speechSynthesis' in window)) {
            reject(new Error("TTS tidak didukung"));
            return;
        }

        speechQueue.push(text);
        processQueue(lang, resolve, reject);
    });
};

const processQueue = async (lang: string, resolve: () => void, reject: (e: Error) => void) => {
    if (isSpeaking || speechQueue.length === 0) return;

    isSpeaking = true;
    const text = speechQueue.shift()!;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    utterance.onend = utterance.onerror = () => {
        isSpeaking = false;
        window.speechSynthesis.cancel();
        processQueue(lang, resolve, reject);
    };

    try {
        window.speechSynthesis.speak(utterance);
        resolve();
    } catch (e) {
        reject(e as Error);
    }
};

export const cancelSpeech = () => {
    window.speechSynthesis?.cancel();
    speechQueue = [];
    isSpeaking = false;
};