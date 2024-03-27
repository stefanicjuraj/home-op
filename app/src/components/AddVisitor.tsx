import { useVisitor } from '../hooks/useVisitor';

export default function AddVisitor() {
    const { newVisitor, setNewVisitor, handleInputChange, handleSubmit, formatDateForInput } = useVisitor();

    return (
        <div className="sm:ml-72 mx-auto mb-8 max-w-7xl px-4">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-between">
                <div className="flex-1 min-w-[40%] md:min-w-[30%] mr-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Visitor name</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        maxLength={20}
                        value={newVisitor.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[40%] md:min-w-[20%] mr-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Date of arrival</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="date"
                        name="date"
                        value={newVisitor.date ? formatDateForInput(newVisitor.date) : ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[40%] md:min-w-[20%] mr-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Time of arrival</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        id="time"
                        type="time"
                        name="time"
                        value={newVisitor.time}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {/* Occasion */}
                <div className="flex-1 min-w-[30%] md:min-w-[10%] mr-2">
                    <label htmlFor="isPaid" className="block mb-1 text-gray-500 text-sm">Occasion</label>
                    <select className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        name="occasion"
                        value={newVisitor.occasion}
                        onChange={e => setNewVisitor({ ...newVisitor, occasion: e.target.value })}
                        required
                    >
                        <option value="" disabled hidden>Select occation</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Party">Party</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Hangout">Hangout</option>
                    </select>
                </div>
                {/* Add */}
                <button className="w-16 border bg-blue-500 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-8 p-3 my-2 mr-2"
                    type="submit">Add
                </button>
            </form >
        </div >
    )

}