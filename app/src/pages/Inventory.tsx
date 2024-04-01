// Hooks
import { useInventory } from '../hooks/useInventory';
// Components
import AddInventory from '../components/AddInventory';
// Icons
import icon from '/delete.svg';

export default function Inventory() {
    const { inventory, handleDelete, calculateRemainingDays } = useInventory();

    return (
        <>
            <div className="mt-32 mb-16 mx-auto max-w-7xl p-4">
                <h1 className="text-5xl font-bold">Inventory</h1>
                <p className="mt-4 text-xl w-2/3 text-black">
                    Create, manage, and keep track of your household items and supplies.
                </p>
            </div>

            <AddInventory />

            <div className="mx-auto max-w-7xl relative overflow-x-auto px-4 mb-32">
                <table className="max-w-7xl mx-auto w-full text-left rtl:text-right">
                    <thead className="text-md text-blue-500 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-5">Item</th>
                            <th scope="col" className="px-6 py-5">Amount</th>
                            <th scope="col" className="px-6 py-5">Expiry date</th>
                            <th scope="col" className="px-6 py-5">Type</th>
                            <th scope="col" className="px-6 py-5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((inventory, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap">
                                    {inventory.name || ""}
                                </td>
                                <td className="px-6 py-4">
                                    {inventory.amount}
                                </td>
                                <td className="px-6 py-5">
                                    {inventory.date ? new Date(inventory.date.seconds * 1000).toLocaleDateString() : ""}
                                    <br />
                                    <span className={`text-sm ${inventory.date && new Date(inventory.date.seconds * 1000) < new Date() ? 'text-red-400' : 'text-gray-500'}`}>
                                        {inventory.date ? calculateRemainingDays(inventory.date) : ""}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="py-2 px-4 bg-blue-100 rounded-xl">
                                        {inventory.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(inventory.id)}>
                                        <img src={icon} className="h-5 w-5" alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    )
}

