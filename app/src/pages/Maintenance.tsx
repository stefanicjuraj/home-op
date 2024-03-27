import { useMaintenance } from '../hooks/useMaintenance';
import icon from '/delete.svg';
import MaintenanceForm from '../components/MaintenanceForm';

export default function Maintenance() {
    const { maintenance, handleDelete, formatDateForInput } = useMaintenance();

    return (
        <>
            <div className="mt-32 mb-16 mx-auto max-w-7xl p-4">
                <h1 className="text-5xl font-bold">Inventory</h1>
                <p className="mt-8 text-xl w-2/3 text-black">Welcome to your maintenance corner.</p>
                <p className="mt-4 text-xl w-2/3 text-black">
                    Create, manage, and keep track of your household maintenance schedules.
                </p>
            </div>

            <MaintenanceForm />

            <div className="mx-auto max-w-7xl relative overflow-x-auto px-4 mb-32">
                <table className="max-w-7xl mx-auto w-full text-left rtl:text-right">
                    <thead className="text-md text-blue-500 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Assigned To</th>
                            <th scope="col" className="px-6 py-3">Due Date</th>
                            <th scope="col" className="px-6 py-3">Completed</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenance.map((task, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap">
                                    {task.description || ""}
                                </td>
                                <td className="px-6 py-4">
                                    {task.assignedTo || ""}
                                </td>
                                <td className="px-6 py-4">
                                    {task.dueDate ? formatDateForInput(task.dueDate) : ""}
                                </td>
                                <td className="px-6 py-4">
                                    {task.isCompleted ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(task.id)}>
                                        <img src={icon} className="h-5 w-5" alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
