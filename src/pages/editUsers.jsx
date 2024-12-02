import React from 'react';
import useEditUser from "../hooks/useEditUser";

function EditUsers() {
    const {
        users,
        statuses,
        departments,
        countries,
        selectedUser,
        editedUser,
        handleSelectUser,
        handleChange,
        handleUndo,
        handleSave,
    } = useEditUser();

    const isEdited = JSON.stringify(selectedUser) !== JSON.stringify(editedUser);


    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-semibold text-center mb-8">Edit User</h2>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
                <select
                    onChange={handleSelectUser}
                    value={selectedUser?.name || ''}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">-- Select User --</option>
                    {users.map((user) => (
                        <option key={user.name} value={user.name}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedUser && (
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">User Information</h3>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={editedUser.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                            <select
                                value={editedUser.department.value}
                                onChange={(e) =>
                                    handleChange('department', departments.find((d) => d.value === e.target.value))
                                }
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {departments.map((department) => (
                                    <option key={department.value} value={department.value}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                            <select
                                value={editedUser.country.value}
                                onChange={(e) =>
                                    handleChange('country', countries.find((c) => c.value === e.target.value))
                                }
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {countries.map((country) => (
                                    <option key={country.value} value={country.value}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={editedUser.status.value}
                                onChange={(e) =>
                                    handleChange('status', statuses.find((s) => s.value === e.target.value))
                                }
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {statuses.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        {isEdited && (
                            <button
                            onClick={handleUndo}
                         className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                    >
                        Undo
                    </button>
                    )}
                    <button
                        onClick={handleSave}
                        className={`px-4 py-2 rounded ${isEdited ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                        disabled={!isEdited}
                    >
                        Save
                    </button>
                </div>
                </div>
            )}
        </div>
    );
}

export default EditUsers;
