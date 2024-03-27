import { useState } from 'react';
import { usePayment } from '../hooks/usePayment';
import AddPayment from '../components/PaymentForm';
import icon from '/delete.svg';
import sort from '/sort.svg';

export default function Payments() {
    const { payments, handleDelete, calculateRemainingDays } = usePayment();
    const [sortPaidFirst, setSortPaidFirst] = useState(true);
    const [sortDueDateAsc, setSortDueDateAsc] = useState(true);
    const [showAlert] = useState(false);

    const toggleSort = () => {
        setSortPaidFirst(!sortPaidFirst);
    };

    const toggleSortDueDate = () => {
        setSortDueDateAsc(!sortDueDateAsc);
    };

    const sortPayments = payments.sort((a, b) => {
        // Sort by isPaid status
        if (a.isPaid !== b.isPaid) {
            return a.isPaid ? 1 : -1; // Sort 'not paid' first
        }

        // If isPaid status is the same, sort by remaining days
        const aDueDate = a.dueDate ? a.dueDate.seconds : Number.MAX_SAFE_INTEGER; // Set default to largest number
        const bDueDate = b.dueDate ? b.dueDate.seconds : Number.MAX_SAFE_INTEGER;
        return aDueDate - bDueDate;
    });

    return (
        <>
            <div className="sm:ml-72 mt-32 mb-16 mx-auto max-w-7xl p-4">
                <h1 className="text-5xl font-bold">Bills & Payments</h1>
                <p className="mt-8 text-xl w-2/3 text-black">Welcome to your bills and payments dashboard.</p>
                <p className="mt-4 text-xl w-2/3 text-black">
                    Here you can create, manage, and keep track of your bills, expenses and payments.
                </p>
            </div>

            {showAlert && (
                <div className="absolute top-0 left-0 w-full flex justify-center z-50">
                    <div className="bg-blue-100 border border-blue-400 text-gray-900 px-4 py-3 rounded-lg fixed bottom-10">
                        <p>Visitor removed successfully!</p>
                    </div>
                </div>
            )}

            <AddPayment />

            <div className="sm:ml-72 mx-auto max-w-7xl relative overflow-x-auto px-4 mb-32">
                <table className="max-w-7xl mx-auto w-full text-left rtl:text-right">
                    <thead className="text-md text-blue-500 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-5">Payment</th>
                            <th scope="col" className="px-6 py-5">Cost</th>
                            <th scope="col" className="px-6 py-5">Date Received</th>
                            <th scope="col" className="px-6 py-5 cursor-pointer" onClick={toggleSortDueDate}>
                                <img src={sort} className="h-6 w-6 inline-flex" alt="sort" />
                                Due Date
                            </th>
                            <th scope="col" className="px-6 py-5">Type</th>
                            <th scope="col" className="px-6 py-5 cursor-pointer whitespace-nowrap" onClick={toggleSort}>
                                <img src={sort} className="h-6 w-6 inline-flex" alt="sort" />
                                Status
                            </th>
                            <th scope="col" className="px-6 py-5">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortPayments.map((payment, index) => (
                            <tr key={index} className="bg-white border-b text-gray-900">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    {payment.payment || ""}
                                </td>
                                <td className="px-6 py-5">
                                    - {payment.amount}
                                </td>
                                <td className="px-6 py-5">
                                    {payment.dateReceived ? new Date(payment.dateReceived.seconds * 1000).toLocaleDateString() : ""}
                                    <br />
                                    <span className="text-sm text-gray-500">
                                        {payment.dateReceived ? calculateRemainingDays(payment.dateReceived) : ""}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    {payment.dueDate ? new Date(payment.dueDate.seconds * 1000).toLocaleDateString() : ""}
                                    <br />
                                    <span className={`text-sm ${payment.dueDate && new Date(payment.dueDate.seconds * 1000) < new Date() ? 'text-red-400' : 'text-gray-500'}`}>
                                        {payment.dueDate ? calculateRemainingDays(payment.dueDate) : ""}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="py-2 px-4 bg-blue-100 rounded-xl">
                                        {payment.type}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    {payment.isPaid ? " Paid" : "Not Paid"}
                                </td>
                                <td className="px-6 py-5">
                                    <button onClick={() => handleDelete(payment.id)}>
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
