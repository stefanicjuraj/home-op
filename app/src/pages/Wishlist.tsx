import { useState } from 'react';
// Hooks
import { useWishlist } from '../hooks/useWishlist';
// Components
import WishlistForm from '../components/AddWishlist';
// Icons
import deleteIcon from '/delete.svg';
import sortIcon from '/sort.svg';

export default function Wishlist() {
    const { wishlistItems, handleDelete, formatDateInput } = useWishlist();
    const [sortTypeFirst, setSortTypeFirst] = useState(true);

    const toggleSort = () => {
        setSortTypeFirst(!sortTypeFirst);
    };

    const sortedWishlistItems = wishlistItems.sort((a, b) => {
        if (sortTypeFirst) {
            return a.type.localeCompare(b.type);
        } else {
            return b.type.localeCompare(a.type);
        }
    });

    return (
        <>
            <div className="mt-32 mb-16 mx-auto max-w-7xl p-4">
                <h1 className="text-5xl font-bold">Wishlist</h1>
                <p className="mt-4 text-xl w-2/3 text-black">
                    Create, manage, and keep track of your home wishlist.
                </p>
            </div>

            <WishlistForm />

            <div className="mx-auto max-w-7xl relative overflow-x-auto px-4 mb-32">
                <table className="max-w-7xl mx-auto w-full text-left rtl:text-right">
                    <thead className="text-md text-blue-500 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-5">
                                Item
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Cost
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-5 cursor-pointer whitespace-nowrap" onClick={toggleSort}>
                                <img src={sortIcon} className="h-6 w-6 mr-1 inline-flex" alt="sort" />
                                Type
                            </th>
                            <th scope="col" className="px-6 py-5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedWishlistItems.map((item, index) => (
                            <tr key={index} className="bg-white border-b text-gray-900">
                                <td className="px-6 py-5 whitespace-nowrap">
                                    {item.item || ""}
                                </td>
                                <td className="px-6 py-5">
                                    {item.amount}
                                </td>
                                <td className="px-6 py-5">
                                    {item.cost}
                                </td>
                                <td className="px-6 py-5">
                                    {item.date && formatDateInput(item.date)}
                                </td>
                                <td className="px-6 py-5">
                                    <span className="py-2 px-4 bg-blue-100 rounded-xl">
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <button onClick={() => handleDelete(Number(item.id))}>
                                        <img src={deleteIcon} className="h-5 w-5" alt="delete" />
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
