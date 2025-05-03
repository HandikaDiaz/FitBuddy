"use client";
import { useForm } from "react-hook-form";

export default function AuthForm({ type }: { type: "login" | "register" }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="glass-effect p-8 rounded-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gradient">
                {type === "login" ? "Login" : "Register"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("email")}
                    placeholder="Email"
                    className="w-full bg-gray-800 rounded-lg p-3 mb-4"
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full bg-gray-800 rounded-lg p-3 mb-6"
                />
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 py-3 rounded-lg font-bold"
                >
                    {type === "login" ? "Sign In" : "Create Account"}
                </button>
            </form>
        </div>
    );
}