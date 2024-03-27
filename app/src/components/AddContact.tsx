import { useContact } from "../hooks/useContact";

export default function AddContact() {
    const { newContacts, handleInputChange, handleSubmit } = useContact();

    return (
        <div className="mx-auto mb-8 max-w-7xl px-4">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-between">
                <div className="flex-1 min-w-[50%] md:min-w-[25%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Contact name</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        name="name"
                        placeholder="Contact Name"
                        value={newContacts.name}
                        onChange={handleInputChange}
                        maxLength={20}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[50%] md:min-w-[20%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Phone number</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={newContacts.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[50%] md:min-w-[45%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Address</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={newContacts.address}
                        onChange={handleInputChange}
                        maxLength={40}
                        required
                    />
                </div>
                <button className="w-16 border bg-blue-500 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-8 p-3 my-2 mr-2"
                    type="submit">Add
                </button>
            </form>
        </div>
    );
}
