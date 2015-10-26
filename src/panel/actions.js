const api = require('./api');
const {
    LOAD_DATA,
    LOAD_DATA_SUCCESS,
    LOAD_DATA_ERROR
} = require('./constants');

function loadData() {
    return dispatch => {
        dispatch({type: LOAD_DATA});

        return api.loadData()
            .then(data =>
                dispatch({
                    type: LOAD_DATA_SUCCESS,
                    ...data
                })
            )
            .catch(err => console.error(err.stack));
    };
}


module.exports = {
    loadData
};