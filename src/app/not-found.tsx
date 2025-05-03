import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <div className="text-center max-w-md">
                <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
                <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
                <p className="text-gray-400 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/dashboard"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg font-bold inline-block"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}