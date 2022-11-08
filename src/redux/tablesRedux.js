import initialState from './initialState.js';

// selectors 
export const getAllTables = (state) => state.tables;
export const getStatus = (state) => state.table.status;
export const getTableId = ({ tables }, tableId) => tables.find((table) => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const GET_TABLES = createActionName('GET_TABLES');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');

// action creators 
export const getTables = (payload) => ({ type: GET_TABLES, payload });
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });

export const fetchTables = dispatch => {
    return (dispatch) => {
        fetch('http://localhost:3131/api/tables')
        .then(res => res.json())
        .then(tables => dispatch(updateTables(tables)));
    }
  };

export const editTableRequest = (table)  => {
    return (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'applicatio/json'
            },
            body: JSON.stringify(table),
        }
        fetch('http://localhost:3131/api/tables', options)
            .then(() => dispatch(updateTables(table)))
    };
}


const tablesReducer = (statePart = initialState, action = {}) => {
    switch (action.type) {
        case GET_TABLES: 
            return { ...statePart, data: [...action.payload] };
        case UPDATE_TABLES: 
            return [...action.payload]
        default: 
            return statePart;
    };
};

export default tablesReducer;