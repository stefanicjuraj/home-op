// Hooks
import { useBillsPayments } from "../hooks/useBillsPayments";
// Icons
import cost from '/cost.svg';

export default function AddBillsPayments() {
    const { newPayment, setNewPayment, handleInputChange, handleSubmit, formatDateInput } = useBillsPayments();

    return (
        <div className="mx-auto mb-8 max-w-7xl px-4">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-between">
                <div className="flex-1 min-w-[35%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Name</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        id="payment"
                        name="payment"
                        placeholder="Phone bill"
                        maxLength={20}
                        value={newPayment.payment}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[20%] sm:min-w-[10%] mr-2 my-2 relative">
                    <label htmlFor="amount" className="block mb-1 text-gray-500 text-sm">Cost</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                            <img src={cost} className="h-6 w-6" />
                        </div>
                        <input className="block p-3.5 w-full z-20 ps-10 text-sm text-gray-900 rounded-md border border-gray-500 focus:border-blue-500 focus:ring-offset-gray-100"
                            type="number"
                            id="amount"
                            name="amount"
                            value={newPayment.amount}
                            onChange={handleInputChange}
                            required />
                    </div>
                </div>
                <div className="flex-1 min-w-[35%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="dateReceived" className="block mb-1 text-gray-500 text-sm">Date Received</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="date"
                        id="dateReceived"
                        name="dateReceived"
                        placeholder="Date Received"
                        value={newPayment.dateReceived ? formatDateInput(newPayment.dateReceived) : ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex-1 min-w-[35%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="dueDate" className="block mb-1 text-gray-500 text-sm">Due Date</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        placeholder="Due Date"
                        value={newPayment.dueDate ? formatDateInput(newPayment.dueDate) : ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex-1 min-w-[20%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="type" className="block mb-1 text-gray-500 text-sm">Payment type</label>
                    <select className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        id="type"
                        name="type"
                        value={newPayment.type}
                        onChange={e => setNewPayment({ ...newPayment, type: e.target.value })}
                        required
                    >
                        <option value="" disabled hidden>Select type</option>
                        <option value="Bill">Bill</option>
                        <option value="Expense">Expense</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>
                <div className="flex-1 min-w-[30%] sm:min-w-[10%] mr-2 my-2">
                    <label htmlFor="isPaid" className="block mb-1 text-gray-500 text-sm">Status</label>
                    <select className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        id="isPaid"
                        name="isPaid"
                        value={newPayment.isPaid ? "paid" : "notPaid"}
                        onChange={e => setNewPayment({ ...newPayment, isPaid: e.target.value === "paid" })}
                        required
                    >
                        <option value="paid">Paid</option>
                        <option value="notPaid">Not Paid</option>
                    </select>
                </div>
                <button className="w-16 bg-blue-500 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-8 p-3 my-2 mr-2"
                    type="submit">
                    Add
                </button>
            </form>

        </div>
    );

}