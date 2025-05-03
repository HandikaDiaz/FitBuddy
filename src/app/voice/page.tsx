"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { VOICE_COMMANDS } from "./voice-commands";
import { cancelSpeech, speak } from "./utils/audio";
import { useDarkModeStore } from "@/store/darkModeStore";

type ProcessedItem = {
    text: string;
    timestamp: number;
};

export default function VoicePage() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const lastProcessedRef = useRef<ProcessedItem>({ text: "", timestamp: 0 });
    const { darkMode } = useDarkModeStore();

    const handleMicError = useCallback((error: string) => {
        console.error("Recognition error:", error);
        setError(`Error: ${error}`);
        setIsListening(false);
    }, []);

    const processCommand = useCallback(async (text: string) => {
        const DEBOUNCE_MS = 500;
        const now = Date.now();
        const cmd = text.toLowerCase().trim();

        if (!cmd || cmd === lastProcessedRef.current.text ||
            (now - lastProcessedRef.current.timestamp < DEBOUNCE_MS)) return;

        lastProcessedRef.current = { text: cmd, timestamp: now };
        setTranscript(cmd);

        const matchedCommand = VOICE_COMMANDS.find(item =>
            cmd.includes(item.command)
        );

        if (matchedCommand) {
            setResponse(matchedCommand.response);
            await cancelSpeech();
            try {
                await speak(matchedCommand.response);
                matchedCommand.action();
            } catch (error) {
                console.error("Fallback to EN:", error);
                await speak(matchedCommand.response, "en-US");
            }
        } else {
            const errorMsg = "Perintah tidak dikenali. Coba ucapkan kembali.";
            setResponse(errorMsg);
            await speak(errorMsg);
        }
    }, []);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            handleMicError("Browser tidak mendukung Web Speech API");
            return;
        }

        // Inisialisasi dengan type assertion
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;

        // Pastikan recognition tidak null
        if (!recognition) {
            handleMicError("Gagal menginisialisasi speech recognition");
            return;
        }

        recognition.lang = "id-ID";
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const last = event.results.length - 1;
            const text = event.results[last][0].transcript;
            processCommand(text);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            handleMicError(event.error);
        };

        return () => {
            recognition.abort();
        };
    }, [processCommand, handleMicError]);

    useEffect(() => {
        if (!recognitionRef.current) return;

        const recognition = recognitionRef.current;

        if (isListening) {
            try {
                recognition.start();
                recognition.onend = () => {
                    if (isListening && recognitionRef.current) {
                        recognitionRef.current.start();
                    }
                };
            } catch (error) {
                handleMicError("Gagal memulai recognition: " + error);
                setIsListening(false);
            }
        } else {
            recognition.onend = null;
            recognition.stop();
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.onend = null;
                recognitionRef.current.stop();
            }
        };
    }, [isListening, handleMicError]);

    useEffect(() => {
        return () => {
            cancelSpeech();
            recognitionRef.current?.abort();
        };
    }, []);

    return (
        <div className={`min-h-screen p-8 transition-colors duration-200 ${darkMode
            ? "bg-dark-bg text-dark-text"
            : "bg-light-bg text-light-text"
            }`}>
            <h1 className={`text-3xl font-bold mb-6 ${darkMode ? "text-dark-primary" : "text-light-primary"
                }`}>AI Voice Coach
            </h1>

            {error && (
                <div className={`p-4 mb-6 rounded-lg ${darkMode ? "bg-red-900/50" : "bg-red-100"} text-red-600`}>
                    {error}
                </div>
            )}

            <div className={`p-6 rounded-xl mb-6 backdrop-blur-md ${darkMode
                ? "bg-dark-card border-dark-accent/30"
                : "bg-light-card border-gray-200"
                }`}>
                <button
                    onClick={() => setIsListening(!isListening)}
                    className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${isListening
                        ? "bg-red-500 hover:bg-red-600 animate-pulse text-white"
                        : darkMode
                            ? "bg-futuristic-primary hover:bg-futuristic-accent text-white"
                            : "bg-light-primary hover:bg-blue-600 text-white"
                        }`}
                >
                    {isListening ? (
                        <>
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                            Stop Listening
                        </>
                    ) : (
                        "🎤 Start Listening"
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl backdrop-blur-md ${darkMode
                    ? "bg-gray-800/80 border border-gray-700"
                    : "bg-white/80 border border-gray-200"
                    }`}>
                    <h2 className="text-xl font-bold mb-4">Perintah Anda</h2>
                    <p className={`p-4 rounded-lg min-h-20 ${darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}>
                        {transcript || "Tekan tombol mikrofon dan ucapkan perintah..."}
                    </p>
                </div>

                <div className={`p-6 rounded-xl backdrop-blur-md ${darkMode
                    ? "bg-gray-800/80 border border-gray-700"
                    : "bg-white/80 border border-gray-200"
                    }`}>
                    <h2 className="text-xl font-bold mb-4">Respon AI</h2>
                    <p className={`p-4 rounded-lg min-h-20 ${darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}>
                        {response || "Menunggu perintah..."}
                    </p>
                </div>
            </div>

            <div className={`p-6 rounded-xl mt-6 backdrop-blur-md ${darkMode
                ? "bg-gray-800/80 border border-gray-700"
                : "bg-white/80 border border-gray-200"
                }`}>
                <h2 className="text-xl font-bold mb-4">Contoh Perintah</h2>
                <ul className="space-y-2">
                    {VOICE_COMMANDS.map((cmd, index) => (
                        <li key={index}>• &quot;{cmd.command}&quot;</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}