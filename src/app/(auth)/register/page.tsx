import AuthForm from "@/components/AuthForm";

export default function Login() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <AuthForm type="login" />
        </div>
    );
}