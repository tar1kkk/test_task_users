import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/usersSlice';

const useEditUser = () => {
    const dispatch = useDispatch();
    const { users, statuses, departments, countries } = useSelector((state) => state.dataSlice);

    const [selectedUser, setSelectedUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null);

    const handleSelectUser = (event) => {
        const user = users.find(u => u.name === event.target.value);
        setSelectedUser(user);
        setEditedUser(user ? { ...user } : null);
    };

    const handleChange = (field, value) => {
        setEditedUser((prev) => ({ ...prev, [field]: value }));
    };

    const handleUndo = () => {
        setEditedUser({ ...selectedUser });
    };

    const handleSave = () => {
        if (editedUser) {
            dispatch(updateUser(editedUser));
            setSelectedUser(editedUser);
        }
    };

    return {
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
    };
};

export default useEditUser;
