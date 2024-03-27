import { useSecurity } from "../hooks/useSecurity";

export default function AddSecurity() {
    const { newSecurityProtocol, setNewSecurityProtocol, handleSubmit } = useSecurity();

    const handleInputChange = (e: { target: { name: unknown; value: unknown; }; }) => {
        const { name, value } = e.target;
        setNewSecurityProtocol((prevState) => ({
            ...prevState,
            [name as string]: value,
        }));
    };

    return (
        <div className="mx-auto mb-8 max-w-7xl px-4">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-between">
                <div className="flex-1 min-w-[50%] md:min-w-[35%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Security protocol</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        name="name"
                        placeholder="Lock the door"
                        value={newSecurityProtocol.name}
                        onChange={handleInputChange}
                        maxLength={30}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[25%] md:min-w-[35%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Description</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        name="description"
                        placeholder="The door should be locked at all times"
                        value={newSecurityProtocol.description}
                        onChange={handleInputChange}
                        maxLength={30}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[25%] md:min-w-[10%] mr-2">
                    <label htmlFor="isPaid" className="block mb-1 text-gray-500 text-sm">Status</label>
                    <select className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        name="isEnabled"
                        value={newSecurityProtocol.isEnabled.toString()}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                    </select>
                </div>
                <button className="w-16 bg-gray-50 border bg-blue-600 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-8 p-3 my-2 mr-2"
                    type="submit">Add
                </button>
            </form>
        </div>
    );
}
