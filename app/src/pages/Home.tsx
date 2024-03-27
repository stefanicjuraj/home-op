import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
// Services
import { auth, db } from '../services/firebase';
// Icons
import bill from '/bill-white.svg';
import maintenance from '/maintenance-white.svg';
import inventory from '/inventory-white.svg';
import visitors from '/visitors-white.svg';
import security from '/security-white.svg';
import contact from '/contact-white.svg';
import wishlist from '/wishlist-white.svg';

export default function Home() {
    const [displayName, setDisplayName] = useState('');
    const [user] = useState(auth.currentUser);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const documentRef = doc(db, "collection", "document"); // Adjust path as needed
                const document = await getDoc(documentRef);

                if (document.exists()) {
                    const usersArray = document.data().users;
                    const userData = usersArray.find((u: { id: unknown; }) => u.id === user.uid); // Find the user by UID
                    if (userData && userData.displayName) {
                        setDisplayName(userData.displayName); // Set the displayName state
                    }
                }
            }
        };

        fetchUserData();
    }, [user]);

    return (
        <>
            <div className="mt-32 mb-0 mx-auto max-w-7xl p-8">
                <h1 className="text-5xl font-bold">
                    👋 Hi {displayName}
                </h1>
                <p className="mt-8 text-xl w-2/3 text-black">
                    Welcome to your home dashboard.
                </p>
                <p className="mt-4 text-xl w-2/3 text-black">
                    Create, manage, plan and keep track of your bills and payments, home inventory, visitors, contacts, security and household maintenance.
                </p>
            </div>

            <div className="mb-24 max-w-screen-xl mx-auto space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 p-8">
                {/* Payments */}
                <Link to="/payments">
                    <div className="mb-8 px-8 py-4 rounded-xl bg-blue-50 shadow-sm hover:shadow-inner hover:shadow-gray-300 animation glow delay-2">
                        <div className="flex justify-center items-center mt-4 mb-4 w-10 h-10 rounded-full bg-blue-400 lg:h-12 lg:w-12">
                            <img src={bill} alt="dropdown" className="w-7 h-7" />
                        </div>
                        <h1 className="mb-4 text-xl font-bold">
                            Bills & Payments
                        </h1>
                        <h1 className="mb-2">
                            View and manage your bills and payments, and keep track of your expenses.
                        </h1>
                        <div className="flex flex-row-reverse">
                        </div>
                    </div>
                </Link>
                {/* Inventory */}
                <Link to="/inventory">
                    <div className="mb-8 px-8 py-4 rounded-xl bg-blue-50 shadow-sm hover:shadow-inner hover:shadow-gray-300 animation glow delay-3">
                        <div className="flex justify-center items-center mt-4 mb-4 w-10 h-10 rounded-full bg-blue-400 lg:h-12 lg:w-12">
                            <img src={inventory} alt="dropdown" className="w-7 h-7" />
                        </div>
                        <h1 className="mb-4 text-xl font-bold">
                            Inventory
                        </h1>
                        <h1 className="mb-2">
                            Stay updated with the latest inventory and stock levels of your home essentials.
                        </h1>
                        <div className="flex flex-row-reverse">
                        </div>
                    </div>
                </Link>
                {/* Visitors */}
                <Link to="/visitors">
                    <div className="mb-8 px-8 py-4 rounded-xl bg-blue-50 shadow-sm hover:shadow-inner hover:shadow-gray-300 animation glow delay-4">
                        <div className="flex justify-center items-center mt-4 mb-4 w-10 h-10 rounded-full bg-blue-400 lg:h-12 lg:w-12">
                            <img src={visitors} alt="dropdown" className="w-7 h-7" />
                        </div>
                        <h1 className="mb-4 text-xl font-bold">
                            Visitors
                        </h1>
                        <h1 className="mb-2">
                            Keep track of your visitors and guests, and manage their stay at your home.
                        </h1>
                        <div className="flex flex-row-reverse">
                        </div>
                    </div>
                </Link>
                {/* Contacts */}
                <Link to="/contacts">
                    <div className="mb-8 px-8 py-4 rounded-xl bg-blue-50 shadow-sm hover:shadow-inner hover:shadow-gray-300 animation glow delay-4">
                        <div className="flex justify-center items-center mt-4 mb-4 w-10 h-10 rounded-full bg-blue-400 lg:h-12 lg:w-12">
                            <img src={contact} alt="dropdown" className="w-7 h-7" />
                        </div>
                        <h1 className="mb-4 text-xl font-bold">
                            Contacts
                        </h1>
                        <h1 className="mb-2">
                            Store and manage a list of emergency contacts, including family members, friends, and local emergency services.
                        </h1>
                        <div className="flex flex-row-reverse">
                        </div>
                    </div>
                </Link>
                {/* Security */}
                <Link to="/security">
                    <div className="mb-8 px-8 py-4 rounded-xl bg-blue-50 shadow-sm hover:shadow-inner hover:shadow-gray-300 animation glow delay-5">
                        <div className="flex justify-center items-center mt-4 mb-4 w-10 h-10 rounded-full bg-blue-400 lg:h-12 lg:w-12">
                            <img src={security} alt="dropdown" className="w-7 h-7" />
                        </div>
                        <h1 className="mb-4 text-xl font-bold">
                            Security
                        </h1>
                        <h1 className="mb-2">
                            Set and manage security protocols, such as closing windows, doors before leaving your home.
                        </h1>
                        <div className="flex flex-row-reverse">
                        </div>
                    </div>
                </Link>
                {/* Maintenance */}
                <Link to="/maintenance">
                    <div className="mb-8 px-8 py-4 rounded-xl bg-blue-50 shadow-sm hover:shadow-inner hover:shadow-gray-300 animation glow delay-5">
                        <div className="flex justify-center items-center mt-4 mb-4 w-10 h-10 rounded-full bg-blue-400 lg:h-12 lg:w-12">
                            <img src={maintenance} alt="dropdown" className="w-7 h-7" />
                        </div>
                        <h1 className="mb-4 text-xl font-bold">
                            Maintenance
                        </h1>
                        <h1 className="mb-2">
                            Track the condition of their property, schedule regular maintenance activities, and arrange for repairs.
                        </h1>
                        <div className="flex flex-row-reverse">

                        </div>
                    </div>
                </Link>
                {/* Wishlist */}
                <Link to="/wishlist">
                    <div className="mb-8 px-8 py-4 rounded-xl bg-blue-50 shadow-sm hover:shadow-inner hover:shadow-gray-300 animation glow delay-5">
                        <div className="flex justify-center items-center mt-4 mb-4 w-10 h-10 rounded-full bg-blue-400 lg:h-12 lg:w-12">
                            <img src={wishlist} alt="dropdown" className="w-7 h-7" />
                        </div>
                        <h1 className="mb-4 text-xl font-bold">
                            Wishlist
                        </h1>
                        <h1 className="mb-2">
                            Keep track of items you want to buy and plan your purchases.
                        </h1>
                        <div className="flex flex-row-reverse">

                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}