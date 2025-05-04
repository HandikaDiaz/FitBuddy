"use client";
import { useState, useRef, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs";
import { useDarkModeStore } from "@/store/darkModeStore";

export default function GesturePage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isActive, setIsActive] = useState(false);
    const [gesture, setGesture] = useState<string>("");
    const { darkMode } = useDarkModeStore();
    const detectionFrameRef = useRef<number | null>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        let model: handpose.HandPose;

        const isFingerOpen = (tipY: number, pipY: number) => tipY < pipY;

        const detectGesture = (landmarks: number[][]) => {
            const thumb = landmarks[4];
            const index = landmarks[8];
            const middle = landmarks[12];
            const ring = landmarks[16];
            const pinky = landmarks[20];

            const indexOpen = isFingerOpen(index[1], landmarks[6][1]);
            const middleOpen = isFingerOpen(middle[1], landmarks[10][1]);
            const ringOpen = isFingerOpen(ring[1], landmarks[14][1]);
            const pinkyOpen = isFingerOpen(pinky[1], landmarks[18][1]);
            const thumbOpen = Math.abs(thumb[0] - landmarks[2][0]) > 30;

            if (indexOpen && middleOpen && ringOpen && pinkyOpen && thumbOpen) {
                return "🖐️ Telapak Terbuka";
            } else if (!indexOpen && !middleOpen && !ringOpen && !pinkyOpen && !thumbOpen) {
                return "✊ Tangan Mengepal";
            } else if (thumbOpen && !indexOpen && !middleOpen && !ringOpen && !pinkyOpen) {
                return "👍 Jempol ke Atas";
            } else if (indexOpen && !middleOpen && !ringOpen && !pinkyOpen) {
                return "👆 Menunjuk";
            } else {
                return "❓ Tidak Dikenali";
            }
        };

        const startDetection = async () => {
            if (!videoElement) return;

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            videoElement.srcObject = stream;
            await videoElement.play();

            model = await handpose.load();

            const detect = async () => {
                if (!videoElement) return;
                const predictions = await model.estimateHands(videoElement);

                if (predictions.length > 0 && predictions[0].landmarks) {
                    const result = detectGesture(predictions[0].landmarks as number[][]);
                    setGesture(result);
                } else {
                    setGesture("❓ Tidak Ada Tangan");
                }

                detectionFrameRef.current = requestAnimationFrame(detect);
            };

            detect();
        };

        if (isActive) {
            startDetection();
        } else {
            const stream = videoElement?.srcObject as MediaStream;
            stream?.getTracks().forEach((track) => track.stop());
            if (detectionFrameRef.current) {
                cancelAnimationFrame(detectionFrameRef.current);
                detectionFrameRef.current = null;
            }
        }

        return () => {
            const stream = videoElement?.srcObject as MediaStream;
            stream?.getTracks().forEach((track) => track.stop());
            if (detectionFrameRef.current) {
                cancelAnimationFrame(detectionFrameRef.current);
            }
        };
    }, [isActive]);


    return (
        <div className={`min-h-screen p-8 transition-colors duration-200 ${darkMode
            ? "bg-dark-bg text-dark-text"
            : "bg-light-bg text-light-text"
            }`}>
            <h1 className={`text-3xl font-bold mb-6 ${darkMode ? "text-dark-primary" : "text-light-primary"
                }`}>
                Gesture Control
            </h1>

            <div className={`p-6 rounded-xl mb-6 border ${darkMode
                ? "bg-dark-card border-dark-accent/30"
                : "bg-light-card border-gray-200"
                }`}>
                <button
                    onClick={() => setIsActive(!isActive)}
                    className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 ${isActive
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : darkMode
                            ? "bg-dark-primary hover:bg-dark-accent text-white"
                            : "bg-light-primary hover:bg-light-accent text-white"
                        }`}
                >
                    {isActive ? (
                        <>
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                            Stop Detection
                        </>
                    ) : (
                        "📷 Enable Camera"
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border ${darkMode
                    ? "bg-dark-card border-dark-accent/30"
                    : "bg-light-card border-gray-200"
                    }`}>
                    <h2 className="text-xl font-bold mb-4">Camera Feed</h2>
                    <div className={`aspect-video rounded-lg flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-100"
                        }`}>
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>

                <div className={`p-6 rounded-xl border ${darkMode
                    ? "bg-dark-card border-dark-accent/30"
                    : "bg-light-card border-gray-200"
                    }`}>
                    <h2 className="text-xl font-bold mb-4">Gesture Terdeteksi</h2>
                    <div className={`p-6 rounded-lg min-h-48 flex flex-col items-center justify-center ${darkMode ? "bg-gray-800/50" : "bg-gray-100"
                        }`}>
                        <span className="text-6xl mb-4">{gesture.split(' ')[0]}</span>
                        <p className="text-center">{gesture.split(' ').slice(1).join(' ')}</p>
                    </div>
                </div>
            </div>

            <div className={`mt-8 p-6 rounded-xl border ${darkMode
                ? "bg-dark-card border-dark-accent/30"
                : "bg-light-card border-gray-200"
                }`}>
                <h2 className="text-xl font-bold mb-4">Daftar Gesture</h2>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <li className="flex flex-col items-center">
                        <span className="text-4xl mb-2">🖐️</span>
                        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Telapak Terbuka</p>
                    </li>
                    <li className="flex flex-col items-center">
                        <span className="text-4xl mb-2">✊</span>
                        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Tangan Mengepal</p>
                    </li>
                    <li className="flex flex-col items-center">
                        <span className="text-4xl mb-2">👍</span>
                        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Jempol ke Atas</p>
                    </li>
                    <li className="flex flex-col items-center">
                        <span className="text-4xl mb-2">👆</span>
                        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Menunjuk</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}