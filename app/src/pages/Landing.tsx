// Components
import Login from '../components/Login';
// Icons
import bill from '/bill-white.svg';
import maintenance from '/maintenance-white.svg';
import inventory from '/inventory-white.svg';
import security from '/security-white.svg';
import contact from '/contact-white.svg';
import wishlist from '/wishlist-white.svg';
// Images
import home from '/home.svg';
import billspayments from '/bills-payments.png';
import inventoryImage from '/inventory.png';
import contacts from '/contacts.png';
import securityImage from '/security.png';
import maintenanceImage from '/maintenance.png';
import wishlistImage from '/wishlist.png';

export default function Landing() {

    return (
        <>
            <section>
                <div className="py-16 px-16 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <img src={home} alt="home" className="w-24 h-24 mx-auto" />
                    <h1 className="mt-4 mb-4 text-center text-7xl text-blue-400 font-bold">
                        HomeOp
                    </h1>
                    <p className="text-center text-[#000] text-2xl mx-auto mt-16 sm:w-4/5 w-full">
                        Create, manage, plan and keep track of your upcoming bills and payments, home inventory, important contacts, security protocols, household maintenance, and home wishlist.
                    </p>
                    <Login />
                </div>

                <div className="bg-blue-50 shadow rounded-xl mt-0 mb-8 gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-8 lg:px-6">
                    <img className="w-full h-full rounded-xl shadow" src={billspayments} alt="dashboard image" />
                    <div className="mt-4 md:mt-0">
                        <div className="inline-flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-400 lg:h-14 lg:w-14">
                            <img src={bill} alt="dropdown" className="w-8 h-8" />
                        </div>
                        <h2 className="inline-flex ml-3 mb-4 mt-4 text-4xl tracking-tight font-extrabold text-gray-900">
                            Bills & Payments
                        </h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg">
                            View and manage your bills and payments, and keep track of your expenses.
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 shadow rounded-xl mt-8 mb-8 gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <img className="w-full h-full rounded-xl shadow" src={inventoryImage} alt="dashboard image" />
                    <div className="mt-4 md:mt-0">
                        <div className="inline-flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-400 lg:h-14 lg:w-14">
                            <img src={inventory} alt="dropdown" className="w-8 h-8" />
                        </div>
                        <h2 className="inline-flex ml-3 mb-4 mt-4 text-4xl tracking-tight font-extrabold text-gray-900">
                            Inventory Management
                        </h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg">
                            Stay updated with the latest inventory and stock levels of your home essentials.
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 shadow rounded-xl mt-8 mb-8 gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <img className="w-full h-full rounded-xl shadow" src={contacts} alt="dashboard image" />
                    <div className="mt-4 md:mt-0">
                        <div className="inline-flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-400 lg:h-14 lg:w-14">
                            <img src={contact} alt="dropdown" className="w-8 h-8" />
                        </div>
                        <h2 className="inline-flex ml-3 mb-4 mt-4 text-4xl tracking-tight font-extrabold text-gray-900">
                            Contacts
                        </h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg">
                            Store and manage a list of emergency contacts, including family members, friends, and local emergency services.
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 shadow rounded-xl mt-8 mb-8 gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <img className="w-full h-full rounded-xl shadow" src={securityImage} alt="dashboard image" />
                    <div className="mt-4 md:mt-0">
                        <div className="inline-flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-400 lg:h-14 lg:w-14">
                            <img src={security} alt="dropdown" className="w-8 h-8" />
                        </div>
                        <h2 className="inline-flex ml-3 mb-4 mt-4 text-4xl tracking-tight font-extrabold text-gray-900">
                            Security
                        </h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg">
                            Set and manage security protocols, such as closing windows, doors before leaving your home.
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 shadow rounded-xl mt-8 mb-8 gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <img className="w-full h-full rounded-xl shadow" src={maintenanceImage} alt="dashboard image" />
                    <div className="mt-4 md:mt-0">
                        <div className="inline-flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-400 lg:h-14 lg:w-14">
                            <img src={maintenance} alt="dropdown" className="w-8 h-8" />
                        </div>
                        <h2 className="inline-flex ml-3 mb-4 mt-4 text-4xl tracking-tight font-extrabold text-gray-900">
                            Maintenance
                        </h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg">
                            Track the condition of their property, schedule regular maintenance activities, and arrange for repairs.
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 shadow rounded-xl mt-8 mb-32 gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <img className="w-full h-full rounded-xl shadow" src={wishlistImage} alt="dashboard image" />
                    <div className="mt-4 md:mt-0">
                        <div className="inline-flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-400 lg:h-14 lg:w-14">
                            <img src={wishlist} alt="dropdown" className="w-8 h-8" />
                        </div>
                        <h2 className="inline-flex ml-3 mb-4 mt-4 text-4xl tracking-tight font-extrabold text-gray-900">
                            Wishlist
                        </h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg">
                            Keep track of items you want to buy and plan your purchases.
                        </p>
                    </div>
                </div>

            </section>

        </>
    )

}