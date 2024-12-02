import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, addUser } from "../redux/usersSlice";

function Users() {
    const dispatch = useDispatch();
    const { users, departments, statuses, countries } = useSelector(
        (state) => state.dataSlice
    );

    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [selectedCountry, setSelectedCountry] = useState("All countries");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        status: "ACTIVE",
        department: "",
        country: "",
    });

    const handleDepartmentChange = (event) => {
        const value = event.target.value;
        setSelectedDepartments((prev) => {
            const newDepartments = prev.includes(value)
                ? prev.filter((department) => department !== value)
                : [...prev, value];
            if (newDepartments.length < 3) {
                setSelectedStatus("ALL");
                setSelectedCountry("All countries");
            }
            return newDepartments;
        });
    };

    const resetFilters = () => {
        setSelectedDepartments([]);
        setSelectedStatus("ALL");
        setSelectedCountry("All countries");
    };

    const handleAddUser = () => {
        setIsModalOpen(true);
    };

    const handleSaveUser = () => {
        if (newUser.name && newUser.department && newUser.country) {
            const userToAdd = {
                name: newUser.name,
                status: statuses.find((status) => status.value === newUser.status),
                department: departments.find(
                    (department) => department.value === newUser.department
                ),
                country: countries.find((country) => country.value === newUser.country),
            };
            dispatch(addUser(userToAdd));
            setIsModalOpen(false);
            setNewUser({ name: "", status: "ACTIVE", department: "", country: "" });
        }
    };

    const handleDeleteUser = (userName) => {
        dispatch(deleteUser({ name: userName }));
    };

    const filteredUsers = users.filter((user) => {
        return (
            (selectedDepartments.length === 0 ||
                selectedDepartments.includes(user.department.value)) &&
            (selectedStatus === "ALL" || user.status.value === selectedStatus) &&
            (selectedCountry === "All countries" ||
                user.country.value === selectedCountry)
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
                        {departments.map((department) => (
                            <div key={department.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={department.value}
                                    value={department.value}
                                    checked={selectedDepartments.includes(department.value)}
                                    onChange={handleDepartmentChange}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor={department.value}
                                    className="text-gray-700"
                                >
                                    {department.name}
                                </label>
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
                        {statuses.map((status) => (
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
                        {countries.map((country) => (
                            <option key={country.value} value={country.value}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="container mx-auto p-6">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-gray-600 font-semibold text-lg">Name</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-semibold text-lg">Department</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-semibold text-lg">Country</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-semibold text-lg">Status</th>
                        <th className="px-6 py-3 text-center text-gray-600 font-semibold text-lg">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            } border-t border-b`}
                        >
                            <td className="px-6 py-4 text-gray-800">{user.name}</td>
                            <td className="px-6 py-4 text-gray-600">{user.department.name}</td>
                            <td className="px-6 py-4 text-gray-600">{user.country.name}</td>
                            <td
                                className={`px-6 py-4 text-sm ${
                                    user.status.value === 'ACTIVE' ? 'text-green-500' : 'text-red-500'
                                }`}
                            >
                                {user.status.name}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button
                                    onClick={() => handleDeleteUser(user.name)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>



            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] h-[400px]">
                        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Первый элемент */}
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, name: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                            </div>

                            {/* Второй элемент */}
                            <div>
                                <label className="block text-gray-700">Department</label>
                                <select
                                    value={newUser.department}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, department: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                >
                                    <option value="" disabled>
                                        Select Department
                                    </option>
                                    {departments.map((department) => (
                                        <option key={department.value} value={department.value}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Третий элемент */}
                            <div>
                                <label className="block text-gray-700">Country</label>
                                <select
                                    value={newUser.country}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, country: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                >
                                    <option value="" disabled>
                                        Select Country
                                    </option>
                                    {countries.map((country) => (
                                        <option key={country.value} value={country.value}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Четвертый элемент */}
                            <div>
                                <label className="block text-gray-700">Status</label>
                                <select
                                    value={newUser.status}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, status: e.target.value })
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                >
                                    <option value="" disabled>
                                        Select Status
                                    </option>
                                    {statuses.map((status) => (
                                        <option key={status.value} value={status.value}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                    </div>
                        <div className="flex justify-end space-x-2 mt-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveUser}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}


export default Users;
