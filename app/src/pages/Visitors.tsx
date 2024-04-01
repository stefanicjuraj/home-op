
// Hooks
import { useVisitor } from '../hooks/useVisitor';
// Components
import AddVisitor from '../components/AddVisitor';
// Icons
import icon from '/delete.svg';

export default function Visitors() {
    const { visitors, showAlert, handleDeleteWithAlert, calculateRemainingDays } = useVisitor();

    return (
        <>
            <div className="mt-32 mb-16 mx-auto max-w-7xl p-4">
                <h1 className="text-5xl font-bold">Visitors</h1>
                <p className="mt-4 text-xl w-2/3 text-black">
                    Create, manage, and keep track of your upcoming visitors and get-togethers.
                </p>
            </div>

            {showAlert && (
                <div className="absolute top-0 left-0 w-full flex justify-center z-50">
                    <div className="bg-blue-100 border border-blue-400 text-gray-900 px-4 py-3 rounded-lg fixed bottom-10">
                        <p>Visitor removed successfully!</p>
                    </div>
                </div>
            )}

            <AddVisitor />

            <div className="mx-auto max-w-7xl relative overflow-x-auto px-4 mb-32">
                <table className="max-w-7xl mx-auto w-full text-left rtl:text-right">
                    <thead className="text-md text-blue-500 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-5">
                                Visitor
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Ocassion
                            </th>
                            <th scope="col" className="px-6 py-5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map((visitor, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap">
                                    {visitor.name || ""}
                                </td>
                                <td className="px-6 py-5">
                                    {visitor.date ? new Date(visitor.date.seconds * 1000).toLocaleDateString() : ""}
                                    <br />
                                    <span className={`text-sm ${visitor.date && new Date(visitor.date.seconds * 1000) < new Date() ? 'text-red-400' : 'text-gray-500'}`}>
                                        {visitor.date ? calculateRemainingDays(visitor.date) : ""}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {visitor.time}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="py-2 px-4 bg-blue-100 rounded-xl">
                                        {visitor.occasion}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <button onClick={() => handleDeleteWithAlert(visitor.id)}>
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

