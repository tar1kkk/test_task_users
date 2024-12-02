import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser, addUser} from '../redux/usersSlice';

function Users() {
    const dispatch = useDispatch();
    const {users, departments, statuses, countries} = useSelector(state => state.dataSlice);

    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [selectedCountry, setSelectedCountry] = useState('All countries');

    const handleDepartmentChange = (event) => {
        const value = event.target.value;
        setSelectedDepartments((prev) => {
            const newDepartments = prev.includes(value)
                ? prev.filter(department => department !== value)
                : [...prev, value];
            if (newDepartments.length < 3) {
                setSelectedStatus('ALL');
                setSelectedCountry('All countries');
            }
            return newDepartments;
        });
    };

    const resetFilters = () => {
        setSelectedDepartments([]);
        setSelectedStatus('ALL');
        setSelectedCountry('All countries');
    };

    const handleAddUser = () => {
        const newUser = {
            name: "New User",
            status: {name: "Active", value: "ACTIVE"},
            department: {name: "Sales", value: "SAL"},
            country: {name: "Canada", value: "CA"},
        };
        dispatch(addUser(newUser));
    };

    const handleDeleteUser = (userName) => {
        dispatch(deleteUser({name: userName}));
    };

    const filteredUsers = users.filter(user => {
        return (
            (selectedDepartments.length === 0 || selectedDepartments.includes(user.department.value)) &&
            (selectedStatus === 'ALL' || user.status.value === selectedStatus) &&
            (selectedCountry === 'All countries' || user.country.value === selectedCountry)
        );
    });

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={handleAddUser}
                >
                    Add User
                </button>
                <button
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                    onClick={resetFilters}
                >
                    Clear Filters
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-gray-700">Departments</label>
                    <div className="mt-2 space-y-2 max-h-24 overflow-y-scroll">
                        {departments.map(department => (
                            <div key={department.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={department.value}
                                    value={department.value}
                                    checked={selectedDepartments.includes(department.value)}
                                    onChange={handleDepartmentChange}
                                    className="mr-2"
                                />
                                <label htmlFor={department.value} className="text-gray-700">{department.name}</label>
                            </div>
                        ))}
                    </div>


                </div>

                <div>
                    <label className="block text-gray-700">Status</label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                        disabled={selectedDepartments.length < 3}
                    >
                        {statuses.map(status => (
                            <option key={status.value} value={status.value}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700">Country</label>
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                        disabled={selectedDepartments.length < 3}
                    >
                        {countries.map(country => (
                            <option key={country.value} value={country.value}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {filteredUsers.map(user => (
                    <div key={user.name}
                         className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div className="flex flex-col justify-between">
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-gray-600">{user.department.name}</p>
                            <p className="text-gray-600">{user.country.name}</p>
                            <p className={`text-sm ${user.status.value === 'ACTIVE' ? 'text-green-500' : 'text-red-500'}`}>{user.status.name}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteUser(user.name)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Users;
