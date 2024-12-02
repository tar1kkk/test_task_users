import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [
        {
            "name": "John Doe",
            "status": {
                "name": "Active",
                "value": "ACTIVE"
            },
            "department": {
                "name": "Information Technology",
                "value": "IT"
            },
            "country": {
                "name": "United States",
                "value": "US"
            }
        },
        {
            "name": "Jane Smith",
            "status": {
                "name": "Disabled",
                "value": "DISABLED"
            },
            "department": {
                "name": "Finance",
                "value": "FIN"
            },
            "country": {
                "name": "Canada",
                "value": "CA"
            }
        },
        {
            "name": "Alice Johnson",
            "status": {
                "name": "Active",
                "value": "ACTIVE"
            },
            "department": {
                "name": "Marketing",
                "value": "MKT"
            },
            "country": {
                "name": "United Kingdom",
                "value": "GB"
            }
        },
        {
            "name": "Bob Brown",
            "status": {
                "name": "All statuses",
                "value": "ALL"
            },
            "department": {
                "name": "Sales",
                "value": "SAL"
            },
            "country": {
                "name": "Australia",
                "value": "AU"
            }
        },
        {
            "name": "Charlie Davis",
            "status": {
                "name": "Active",
                "value": "ACTIVE"
            },
            "department": {
                "name": "Customer Support",
                "value": "CS"
            },
            "country": {
                "name": "Germany",
                "value": "DE"
            }
        },
        {
            "name": "Eve Wilson",
            "status": {
                "name": "Disabled",
                "value": "DISABLED"
            },
            "department": {
                "name": "Human Resources",
                "value": "HR"
            },
            "country": {
                "name": "France",
                "value": "FR"
            }
        },
        {
            "name": "Frank Moore",
            "status": {
                "name": "Active",
                "value": "ACTIVE"
            },
            "department": {
                "name": "Operations",
                "value": "OPS"
            },
            "country": {
                "name": "India",
                "value": "IN"
            }
        },
        {
            "name": "Grace Lee",
            "status": {
                "name": "All statuses",
                "value": "ALL"
            },
            "department": {
                "name": "Legal",
                "value": "LEG"
            },
            "country": {
                "name": "China",
                "value": "CN"
            }
        },
        {
            "name": "Henry White",
            "status": {
                "name": "Active",
                "value": "ACTIVE"
            },
            "department": {
                "name": "Product Management",
                "value": "PM"
            },
            "country": {
                "name": "Japan",
                "value": "JP"
            }
        },
        {
            "name": "Isabella Green",
            "status": {
                "name": "Disabled",
                "value": "DISABLED"
            },
            "department": {
                "name": "Research and Development",
                "value": "R&D"
            },
            "country": {
                "name": "Ukraine",
                "value": "UA"
            }
        },
        {
            "name": "Jack Black",
            "status": {
                "name": "Active",
                "value": "ACTIVE"
            },
            "department": {
                "name": "Sales",
                "value": "SAL"
            },
            "country": {
                "name": "Australia",
                "value": "AU"
            }
        },
        {
            "name": "Lily Scott",
            "status": {
                "name": "All statuses",
                "value": "ALL"
            },
            "department": {
                "name": "Information Technology",
                "value": "IT"
            },
            "country": {
                "name": "Canada",
                "value": "CA"
            }
        }
    ],
    departments: [
        {
            "name": "Human Resources",
            "value": "HR"
        },
        {
            "name": "Finance",
            "value": "FIN"
        },
        {
            "name": "Information Technology",
            "value": "IT"
        },
        {
            "name": "Marketing",
            "value": "MKT"
        },
        {
            "name": "Sales",
            "value": "SAL"
        },
        {
            "name": "Customer Support",
            "value": "CS"
        },
        {
            "name": "Research and Development",
            "value": "R&D"
        },
        {
            "name": "Operations",
            "value": "OPS"
        },
        {
            "name": "Legal",
            "value": "LEG"
        },
        {
            "name": "Product Management",
            "value": "PM"
        }
    ],
    statuses: [
        {
            "name": "All statuses",
            "value": "ALL"
        },
        {
            "name": "Active",
            "value": "ACTIVE"
        },
        {
            "name": "Disabled",
            "value": "DISABLED"
        }
    ],
    countries: [
        {
            "name": "Ukraine",
            "value": "UA"
        },
        {
            "name": "United States",
            "value": "US"
        },
        {
            "name": "Canada",
            "value": "CA"
        },
        {
            "name": "Germany",
            "value": "DE"
        },
        {
            "name": "France",
            "value": "FR"
        },
        {
            "name": "Australia",
            "value": "AU"
        },
        {
            "name": "Japan",
            "value": "JP"
        },
        {
            "name": "United Kingdom",
            "value": "GB"
        },
        {
            "name": "China",
            "value": "CN"
        },
        {
            "name": "India",
            "value": "IN"
        }
    ]
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        updateUser(state, action) {
            const index = state.users.findIndex(user => user.name === action.payload.name);
            if (index !== -1) state.users[index] = action.payload;
        },
        deleteUser(state, action) {
            state.users = state.users.filter(user => user.name !== action.payload.name);
        },
        addUser(state, action) {
            state.users.push(action.payload);
        }
    }
});

export const { updateUser, deleteUser, addUser } = dataSlice.actions;
export default dataSlice.reducer;