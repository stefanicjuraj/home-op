// Hooks
import { useContact } from '../hooks/useContact';
// Componenets
import ContactForm from '../components/AddContact';
// Icons
import DeleteIcon from '/delete.svg';

export default function Contact() {
    const { contacts, handleDelete } = useContact();

    return (
        <>
            <div className="mt-32 mb-16 mx-auto max-w-7xl p-4">
                <h1 className="text-5xl font-bold">Contacts</h1>
                <p className="mt-8 text-xl w-2/3 text-black">Welcome to your contacts dashboard.</p>
                <p className="mt-4 text-xl w-2/3 text-black">
                    Here you can create, manage, and keep track of contact list.
                </p>
            </div>

            <ContactForm />

            <div className="mx-auto max-w-7xl relative overflow-x-auto px-4">
                <table className="max-w-7xl mx-auto w-full text-left rtl:text-right">
                    <thead className="text-md text-blue-500 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-5">Name</th>
                            <th scope="col" className="px-6 py-5">Phone Number</th>
                            <th scope="col" className="px-6 py-5">Address</th>
                            <th scope="col" className="px-6 py-5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index} className="bg-white border-b text-gray-900">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    {contact.name || ""}
                                </td>
                                <td className="px-6 py-5">
                                    {contact.phoneNumber || ""}
                                </td>
                                <td className="px-6 py-5">
                                    {contact.address || ""}
                                </td>
                                <td className="px-6 py-5">
                                    <button onClick={() => handleDelete(contact.id)}>
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
