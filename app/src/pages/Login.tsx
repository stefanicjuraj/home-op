import { signInWithGoogle } from '../hooks/useAuth';

export default function Login() {
    return (
        <div className="mx-auto text-center mb-24">
            <button type="button" className="text-white bg-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-xl text-sm mx-auto px-7 py-3"
                onClick={() => signInWithGoogle()
                    .then(user => console.log('Logged in user:', user))
                    .catch(error => console.error("Login failed: ", error))}>
                Sign in with Google
            </button>
        </div>
    );
}
