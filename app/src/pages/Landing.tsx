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
                                Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={inventory} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">Inventory</h2>
                            <p className="text-gray-500">Protect your organization, devices and stay compliant with our structured workflows and custom permissions made for you.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={visitors} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">Visitors</h2>
                            <p className="text-gray-500">Auto-assign tasks, send Slack messages, and much more. Now power up with hundreds of new templates to help you get started.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={contact} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">Contacts</h2>
                            <p className="text-gray-500">Audit-proof software built for critical financial operations like month-end close and quarterly budgeting.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={security} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">Security</h2>
                            <p className="text-gray-500">Craft beautiful, delightful experiences for both marketing and product with real cross-company collaboration.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={maintenance} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h3 className="mb-2 text-2xl font-bold">Wishlist</h3>
                            <p className="text-gray-500">Keep your company’s lights on with customizable, iterative, and structured workflows built for all efficient teams and individual.</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-500 lg:h-16 lg:w-16">
                                <img src={maintenance} alt="dropdown" className="w-8 h-8" />
                            </div>
                            <h3 className="mb-2 text-2xl font-bold">Maintenance</h3>
                            <p className="text-gray-500">Keep your company’s lights on with customizable, iterative, and structured workflows built for all efficient teams and individual.</p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )

}