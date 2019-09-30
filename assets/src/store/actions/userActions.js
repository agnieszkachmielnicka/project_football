import axios from 'axios';

export const setCity = (val) => {
    return {
        type: "SET_CITY",
        city: val,
    }
}

export const selectCountry = (val) => {
    return {
        type: "SELECT_COUNTRY",
        country: val,
    }
}

export const changeUser = (user) => {
    return {
        type: "CHANGE_USER",
        user: user,
    }
}

export const changeUserDetails = (data) => {

    return dispatch => {
        axios.put('http://localhost:8000/accounts/api/users/' + data.username + '/', data)
        .then(res => {
            dispatch(changeUser(data))          
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getUser = (user) => {
    return {
        type: "GET_USER",
        user: user
    }
}

export const getUserDetails = (username) => {
    return dispatch => {
        axios.get('http://localhost:8000/accounts/api/users/' + username)
        .then(res => {
            const user = res.data
            dispatch(getUser(user))          
        })
        .catch(err => {
            console.log(err)
        })
    }
}