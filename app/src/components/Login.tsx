import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../hooks/useAuth';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="mx-auto text-center my-32">
            <button type="button" className="text-white bg-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-xl text-md mx-auto px-7 py-4"
                onClick={() => signInWithGoogle()
                    .then(user => {
                        console.log('Logged in user:', user);
                        navigate('/');
                    })
                    .catch(error => console.error("Login failed: ", error))}>
                Sign in with Google
            </button>
        </div>
    );
}
