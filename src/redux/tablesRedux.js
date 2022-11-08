import initialState from './initialState.js';

// selectors 
export const getAllTables = (state) => state.tables;
export const getStatus = (state) => state.table.status;
export const getTableId = ({ tables }, tableId) => tables.find((table) => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const GET_TABLES = createActionName('GET_TABLES');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

// action creators 
export const getTables = (payload) => ({ type: GET_TABLES, payload });
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const updateTable = (payload) => ({ type: UPDATE_TABLE, payload });

export const fetchTables = dispatch => { // nie ma żadnej metody (np. PUT, POST itp. ) ponieważ domyślnie używany jest GET
    return (dispatch) => {
        fetch('http://localhost:3131/api/tables')
        .then(res => res.json())
        .then(tables => dispatch(updateTables(tables)));
    }
  };

export const editTableRequest = (table)  => {
    return (dispatch) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'applicatio/json'
            },
            body: JSON.stringify(table),
        }
        fetch('http://localhost:3131/api/tables/'+table.id, options) // fetch ogólnie służy do komunikacji z serwerem, nie koniecznie tylko "przynieś dane" - ale np. PUT/PATCH - aktualizuje dane
            .then(() => dispatch(updateTable(table)))
    };
}


const tablesReducer = (statePart = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_TABLES: 
            return action.payload;
        case UPDATE_TABLE: 
            return  statePart.map((table) => {
                                                            if(table.id === action.payload.id) {
                                                                return action.payload;
                                                            }  else {
                                                                return table;
                                                            }
                                                        }
                                                )
                    
        default: 
            return statePart;
    };
};

export default tablesReducer;