"use client";

export function Switch({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-blue-500" : "bg-gray-600"
                }`}
            onClick={() => onChange(!checked)}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </button>
    );
}