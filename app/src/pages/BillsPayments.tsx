import { useState } from 'react';
// Hooks
import { usePayment } from '../hooks/usePayment';
// Components
import AddPayment from '../components/AddBillsPayments';
// Icons
import icon from '/delete.svg';
import sort from '/sort.svg';

export default function BillsPayments() {
    const { payments, handleDelete, calculateRemainingDays, togglePaymentStatus } = usePayment();
    const [sortPaidFirst, setSortPaidFirst] = useState(true);

    const toggleSort = () => {
        setSortPaidFirst(!sortPaidFirst);
    };

    const sortPayments = payments.sort((a, b) => {
        if (a.isPaid !== b.isPaid) {
            return a.isPaid ? 1 : -1;
        }

        const aDueDate = a.dueDate ? a.dueDate.seconds : Number.MAX_SAFE_INTEGER;
        const bDueDate = b.dueDate ? b.dueDate.seconds : Number.MAX_SAFE_INTEGER;
        return aDueDate - bDueDate;
    });

    const totalCost = sortPayments.reduce((acc, payment) => acc + payment.amount, 0);

    return (
        <>
            <div className="mt-32 mb-16 mx-auto max-w-7xl p-4">
                <h1 className="text-5xl font-bold">
                    Bills & Payments
                </h1>
                <p className="mt-4 text-xl w-2/3 text-black">
                    Here you can create, manage, and keep track of your bills, expenses and payments.
                </p>
            </div>

            <AddPayment />

            <div className="mx-auto max-w-7xl relative overflow-x-auto px-4 mb-32">
                <table className="max-w-7xl mx-auto w-full text-left rtl:text-right">
                    <thead className="text-md text-blue-500 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-5">
                                Payment
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Cost
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Date Received
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Due Date
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-5 cursor-pointer whitespace-nowrap" onClick={toggleSort}>
                                <img src={sort} className="h-6 w-6 inline-flex" alt="sort" />
                                Status
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Action
                            </th>
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
                                    <button
                                        className={`px-4 py-2 rounded-xl ${payment.isPaid ? 'bg-green-200' : 'bg-red-200'}`}
                                        onClick={() => togglePaymentStatus(payment.id, !payment.isPaid)}>
                                        {payment.isPaid ? "Paid" : "Not Paid"}
                                    </button>
                                </td>
                                <td className="px-6 py-5">
                                    <button onClick={() => handleDelete(payment.id)}>
                                        <img src={icon} className="h-5 w-5" alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-white uppercase font-bold">
                            <td className="px-6 py-5 text-blue-500 bg-blue-50" colSpan={1}>
                                Total cost
                            </td>
                            <td className="px-6 py-5">
                                - {totalCost.toLocaleString()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
