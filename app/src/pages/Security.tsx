// Hooks
import { useSecurity } from '../hooks/useSecurity';
// Components
import AddSecurity from '../components/AddSecurity';
// Icons
import DeleteIcon from '/delete.svg';

export default function Security() {
    const { security, handleDelete, toggleSecurityStatus } = useSecurity();

    return (
        <>
            <div className="mt-32 mb-16 mx-auto max-w-7xl p-4">
                <h1 className="text-5xl font-bold">
                    Security
                </h1>
                <p className="mt-4 text-xl w-2/3 text-black">
                    Create, manage, and keep your home safe and secure with security protocols.
                </p>
            </div>

            <AddSecurity />

            <div className="mx-auto max-w-7xl relative overflow-x-auto px-4 mb-32">
                <table className="max-w-7xl mx-auto w-full text-left rtl:text-right">
                    <thead className="text-md text-blue-500 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-5">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {security.map((protocol, index) => (
                            <tr key={index} className="bg-white border-b text-gray-900">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    {protocol.name || ""}
                                </td>
                                <td className="px-6 py-5">
                                    {protocol.description}
                                </td>
                                <td className="px-6 py-5">
                                    <button
                                        className={`px-4 py-2 rounded-xl ${protocol.isEnabled ? 'bg-green-200' : 'bg-red-200'}`}
                                        onClick={() => toggleSecurityStatus(protocol.id, !protocol.isEnabled)}>
                                        {protocol.isEnabled ? "Enabled" : "Disabled"}
                                    </button>
                                </td>
                                <td className="px-6 py-5">
                                    <button onClick={() => handleDelete(protocol.id)}>
                                        <img src={DeleteIcon} className="h-5 w-5" alt="delete" />
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
