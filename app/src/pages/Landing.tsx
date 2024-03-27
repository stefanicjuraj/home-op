import Login from './Login';
// Icons
import bill from '/bill-white.svg';
import maintenance from '/maintenance-white.svg';
import inventory from '/inventory-white.svg';
import visitors from '/visitors-white.svg';
import security from '/security-white.svg';
import contact from '/contact-white.svg';

export default function Landing() {

    return (
        <>
            <section className="bg-white">
                <div className="py-16 px-16 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <h1 className="mt-24 mb-4 text-center text-7xl text-blue-500 font-bold">
                        HomeOp
                    </h1>
                    <p className="text-center text-[#000] text-2xl mx-auto mt-16 mb-16 w-4/5">
                        Create, manage, plan and keep track of your upcoming bills and payments, home inventory, invited visitors, important contacts, security protocols and household maintenance.
                    </p>
                    <Login />
                    <div className="text-[#000] space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={bill} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h2 className="mb-4 text-2xl font-bold">Bills & Payments</h2>
                            <p className="text-gray-500">
                                View and manage your bills and payments, and keep track of your expenses.
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={inventory} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">Inventory</h2>
                            <p className="text-gray-500">
                                Stay updated with the latest inventory and stock levels of your home essentials.
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={visitors} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">Visitors</h2>
                            <p className="text-gray-500">
                                Keep track of your visitors and guests, and manage their stay at your home.
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={contact} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">Contacts</h2>
                            <p className="text-gray-500">
                                Store and manage a list of emergency contacts, including family members, friends, and local emergency services.
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={security} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">Security</h2>
                            <p className="text-gray-500">
                                Set and manage security protocols, such as closing windows, doors before leaving your home.
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={maintenance} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h3 className="mb-2 text-2xl font-bold">Maintenance</h3>
                            <p className="text-gray-500">
                                Track the condition of their property, schedule regular maintenance activities, and arrange for repairs.
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={maintenance} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h3 className="mb-2 text-2xl font-bold">Wishlist</h3>
                            <p className="text-gray-500">
                                Keep track of items you want to buy and plan your purchases.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )

}