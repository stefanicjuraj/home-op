
import { logoutUser } from "../hooks/useAuth";

function LogOut() {
    const handleSignOut = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleSignOut} className="sm:ml-96 text-blue-500 bg-white border border-blue-500 hover:text-white hover:bg-blue-500 hover:border-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm px-4 py-2 text-center">
            Log Out
        </button>
    );
}

export default LogOut;
