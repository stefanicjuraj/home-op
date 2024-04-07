import { useContact } from "../hooks/useContact";
// Icons
import phone from "/phone.svg";
import contact from "/user.svg";
import address from "/address.svg";

export default function AddContact() {
    const { newContacts, handleInputChange, handleSubmit } = useContact();

    return (
        <div className="mx-auto mb-8 max-w-7xl px-4">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-between">
                <div className="flex-1 min-w-[50%] md:min-w-[25%] mr-2 my-2">
                    <label htmlFor="name" className="block mb-1 text-gray-500 text-sm">
                        Contact name
                    </label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                            <img src={contact} className="h-6 w-6" />
                        </div>
                        <input className="w-full z-20 ps-10 rounded-md border border-gray-500 focus:border-blue-500 p-3"
                            type="text"
                            name="name"
                            placeholder="Contact Name"
                            value={newContacts.name}
                            onChange={handleInputChange}
                            maxLength={20}
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-[50%] md:min-w-[20%] mr-2 my-2">
                    <label htmlFor="phoneNumber" className="block mb-1 text-gray-500 text-sm">
                        Phone number
                    </label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                            <img src={phone} className="h-6 w-6" />
                        </div>
                        <input className="w-full z-20 ps-10 rounded-md border border-gray-500 focus:border-blue-500 p-3"
                            type="number"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={newContacts.phoneNumber}
                            onChange={handleInputChange}
                            onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                target.value = target.value.slice(0, 15);
                            }}
                            required
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-[50%] md:min-w-[45%] mr-2 my-2">
                    <label htmlFor="address" className="block mb-1 text-gray-500 text-sm">
                        Address
                    </label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                            <img src={address} className="h-6 w-6" />
                        </div>
                        <input className="w-full z-20 ps-10 rounded-md border border-gray-500 focus:border-blue-500 p-3"
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={newContacts.address}
                            onChange={handleInputChange}
                            maxLength={40}
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>
                <button className="w-16 border bg-blue-500 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-8 p-3 my-2 mr-2"
                    type="submit">
                    Add
                </button>
            </form>
        </div>
    );
}
