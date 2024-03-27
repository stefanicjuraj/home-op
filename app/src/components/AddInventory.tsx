import { useInventory } from '../hooks/useInventory';

export default function AddInventory() {
    const { newInventory, setNewInventory, handleInputChange, handleSubmit, formatDateInput } = useInventory();

    return (
        <div className="sm:ml-72  mx-auto mb-8 max-w-7xl px-4">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-between">
                <div className="flex-1 min-w-[35%] sm:min-w-[20%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Inventory item</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        name="name"
                        placeholder="Item name"
                        value={newInventory.name}
                        onChange={handleInputChange}
                        maxLength={20}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[25%] sm:min-w-[10%] mr-2">
                    <label htmlFor="amount" className="block mb-1 text-gray-500 text-sm">Amount</label>
                    <input className="w-full pl-5 rounded-md border border-gray-500 focus:border-blue-500 p-3 my-2"
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={newInventory.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[30%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Expiry date</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={newInventory.date ? formatDateInput(newInventory.date) : ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[30%] sm:min-w-[10%] mr-2">
                    <label htmlFor="type" className="block mb-1 text-gray-500 text-sm">Status</label>
                    <select className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        name="type"
                        value={newInventory.type}
                        onChange={e => setNewInventory({ ...newInventory, type: e.target.value })}
                        required
                    >
                        <option value="" disabled hidden>Type</option>
                        <option value="Groceries">Grocery</option>
                        <option value="Essential">Essential</option>
                        <option value="Utility">Utility</option>
                        <option value="Pet Care">Pet Care</option>
                    </select>
                </div>
                <button className="w-16 border bg-blue-500 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-8 p-3 my-2 mr-2"
                    type="submit">Add
                </button>
            </form >
        </div >
    )

}