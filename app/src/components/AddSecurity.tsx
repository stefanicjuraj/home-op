import { useSecurity } from "../hooks/useSecurity";
// Icons
import description from "/description.svg";

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
                    <label htmlFor="name" className="block mb-1 text-gray-500 text-sm">Security protocol</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        name="name"
                        placeholder="Lock the door"
                        value={newSecurityProtocol.name}
                        onChange={handleInputChange}
                        maxLength={30}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="flex-1 min-w-[25%] md:min-w-[35%] mr-2 my-2">
                    <label htmlFor="description" className="block mb-1 text-gray-500 text-sm">Description</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                            <img src={description} className="h-6 w-6" />
                        </div>
                        <input className="block p-3.5 w-full z-20 ps-10 text-sm text-gray-900 rounded-md border border-gray-500 focus:border-blue-500 focus:ring-offset-gray-100"
                            type="text"
                            name="description"
                            placeholder="The door should be locked at all times"
                            value={newSecurityProtocol.description}
                            onChange={handleInputChange}
                            maxLength={30}
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-[25%] md:min-w-[10%] mr-2">
                    <label htmlFor="isEnabled" className="block mb-1 text-gray-500 text-sm">Status</label>
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
                <button className="w-16 border bg-blue-500 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-8 p-3 my-2 mr-2"
                    type="submit">
                    Add
                </button>
            </form>
        </div>
    );
}
