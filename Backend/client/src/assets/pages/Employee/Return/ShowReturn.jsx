import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

function ShowReturn() {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8076/searchReturn?search=${searchQuery}`
            );
            setReturns(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching return:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8076/returns')
            .then((response) => {
                setReturns(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const applySearchFilter = (returnData) => {
        return (
            returnData.returnID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.returnDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.returnItemN.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.cusName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.cAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.phoneNO.toLowerCase().includes(searchQuery.toLowerCase()) ||
            returnData.rStatus.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredReturns = returns.filter(applySearchFilter);

    return (
        <div>
            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Return List</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter search query"
                            className="mr-2 border border-gray-400 p-2"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <Link to='/returns/create'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add Return
                        </button>
                    </Link>
                    <div style={{ marginLeft: '10px' }}></div> {/* Space between buttons */}
                    <Link to='/returns/reportReturn'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Report
                        </button>
                    </Link>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <table className='w-full border-separate border-spacing-2'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600 rounded-md'>No</th>
                                <th className='border border-slate-600 rounded-md'>Return ID</th>
                                <th className='border border-slate-600 rounded-md'>Return Date</th>
                                <th className='border border-slate-600 rounded-md'>Return Item Name</th>
                                <th className='border border-slate-600 rounded-md'>Reason</th>
                                <th className='border border-slate-600 rounded-md'>Customer Name</th>
                                <th className='border border-slate-600 rounded-md'>Customer Address</th>
                                <th className='border border-slate-600 rounded-md'>Phone Number</th>
                                <th className='border border-slate-600 rounded-md'>Return Status</th>
                                <th className='border border-slate-600 rounded-md'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReturns.map((returnData, index) => (
                                <tr key={returnData._id} className='h-8'>
                                    <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{returnData.returnID}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{returnData.returnDate}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{returnData.returnItemN}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{returnData.reason}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{returnData.cusName}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{returnData.cAddress}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{returnData.phoneNO}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>{returnData.rStatus}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/returns/details/${returnData._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800' />
                                            </Link>
                                            <Link to={`/returns/edit/${returnData._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/returns/delete/${returnData._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default ShowReturn;
