import { useMaintenance } from "../hooks/useMaintenance";
// Icons
import user from "/user.svg";
import maintenance from "/maintenance-dark.svg";

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
                    <label htmlFor="description" className="block mb-1 text-gray-500 text-sm">
                        Maintenance task
                    </label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                            <img src={maintenance} className="h-6 w-6" />
                        </div>
                        <input className="block p-3.5 w-full z-20 ps-10 text-sm text-gray-900 rounded-md border border-gray-500 focus:border-blue-500 focus:ring-offset-gray-100"
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Home cleaning"
                            value={newMaintenanceTask.description}
                            onChange={handleInputChange}
                            maxLength={30}
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-[25%] md:min-w-[25%] mr-2 my-2">
                    <label htmlFor="assignedTo" className="block mb-1 text-gray-500 text-sm">
                        Assigned to
                    </label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3 pointer-events-none">
                            <img src={user} className="h-6 w-6" />
                        </div>
                        <input className="w-full z-20 ps-10 rounded-md border border-gray-500 focus:border-blue-500 p-3"
                            type="text"
                            name="assignedTo"
                            id="assignedTo"
                            placeholder="John Doe"
                            value={newMaintenanceTask.assignedTo}
                            onChange={handleInputChange}
                            maxLength={30}
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-[25%] md:min-w-[10%] mr-2 my-2">
                    <label htmlFor="dueDate" className="block mb-1 text-gray-500 text-sm">
                        Due date
                    </label>
                    <input className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        value={newMaintenanceTask.dueDate ? formatDateForInput(newMaintenanceTask.dueDate) : ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex-1 min-w-[25%] md:min-w-[5%] mr-2 my-2">
                    <label htmlFor="isCompleted" className="block mb-1 text-gray-500 text-sm">
                        Status
                    </label>
                    <select className="w-full rounded-md border border-gray-500 focus:border-blue-500 p-3"
                        name="isCompleted"
                        id="isCompleted"
                        value={newMaintenanceTask.isCompleted.toString()}
                        onChange={handleInputChange}
                    >
                        <option value="false">Not Completed</option>
                        <option value="true">Completed</option>
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
