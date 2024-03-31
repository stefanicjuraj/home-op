import { useWishlist } from "../hooks/useWishlist";
// Icons
import cost from '/cost.svg';

export default function AddWishlist() {
    const { newWishlistItem, setNewWishlistItem, handleInputChange, handleSubmit, formatDateInput } = useWishlist();

    return (
        <div className="mx-auto mb-8 max-w-7xl px-4">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-between">
                <div className="flex-1 min-w-[35%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Item</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        id="item"
                        name="item"
                        placeholder="Item"
                        maxLength={20}
                        value={newWishlistItem.item}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[20%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Amount</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="Amount"
                        value={newWishlistItem.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[30%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="cost" className="block mb-1 text-gray-500 text-sm">Cost</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                            <img src={cost} className="h-6 w-6" />
                        </div>
                        <input className="block p-3.5 w-full z-20 ps-10 text-sm text-gray-900 rounded-md border border-gray-500 focus:border-blue-500 focus:ring-offset-gray-100"
                            type="number"
                            id="cost"
                            name="cost"
                            placeholder="Cost"
                            value={newWishlistItem.cost}
                            onChange={handleInputChange}
                            required />
                    </div>
                </div>
                <div className="flex-1 min-w-[30%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Date</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="date"
                        id="date"
                        name="date"
                        placeholder="Date"
                        value={newWishlistItem.date ? formatDateInput(newWishlistItem.date) : ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[30%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="type" className="block mb-1 text-gray-500 text-sm">Type</label>
                    <select className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        id="type"
                        name="type"
                        value={newWishlistItem.type}
                        onChange={e => setNewWishlistItem({ ...newWishlistItem, type: e.target.value })}
                        required
                    >
                        <option value="" disabled hidden>Type</option>
                        <option value="Personal">Personal</option>
                        <option value="Household">Household</option>
                    </select>
                </div>
                <button className="w-16 border bg-blue-500 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-8 p-3 my-2 mr-2"
                    type="submit">Add
                </button>
            </form>
        </div>
    );
}
