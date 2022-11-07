import initialState from './initialState.js';

// selectors 
export const getAllTables = (state) => state.tables;
export const getStatus = (state) => state.table.status;
export const getTableId = ({ tables }, tableId) => tables.find((table) => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const GET_TABLES = createActionName('GET_TABLES');

// action creators 
export const getTables = (payload) => ({ type: GET_TABLES, payload });


const tablesReducer = (statePart = initialState, action = {}) => {
    switch (action.type) {
        case GET_TABLES: 
            return { ...statePart, data: [...action.payload] };
        default: 
            return statePart;
    };
};

export default tablesReducer;