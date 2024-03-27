import { useMaintenance } from "../hooks/useMaintenance";

export default function AddMaintenance() {
    const {
        newMaintenanceTask,
        handleInputChange,
        handleSubmit,
        formatDateForInput
    } = useMaintenance();

    return (
        <div className="mx-auto mb-8 max-w-7xl px-4">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-between">
                <div className="flex-1 min-w-[35%] md:min-w-[25%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Maintenance task</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        name="description"
                        placeholder="Home cleaning"
                        value={newMaintenanceTask.description}
                        onChange={handleInputChange}
                        maxLength={30}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[25%] md:min-w-[25%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Assigned to</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="text"
                        name="assignedTo"
                        placeholder="John Doe"
                        value={newMaintenanceTask.assignedTo}
                        onChange={handleInputChange}
                        maxLength={30}
                        required
                    />
                </div>
                <div className="flex-1 min-w-[25%] md:min-w-[10%] mr-2 my-2">
                    <label htmlFor="payment" className="block mb-1 text-gray-500 text-sm">Due date</label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="date"
                        name="dueDate"
                        value={newMaintenanceTask.dueDate ? formatDateForInput(newMaintenanceTask.dueDate) : ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex-1 min-w-[25%] md:min-w-[5%] mr-2 my-2">
                    <label htmlFor="isPaid" className="block mb-1 text-gray-500 text-sm">Status</label>
                    <select className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        name="isCompleted"
                        value={newMaintenanceTask.isCompleted.toString()}
                        onChange={handleInputChange}
                    >
                        <option value="false">Not Completed</option>
                        <option value="true">Completed</option>
                    </select>
                </div>
                <button className="w-16 border bg-blue-500 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-8 p-3 my-2 mr-2"
                    type="submit">Add
                </button>
            </form>
        </div>
    );
}
