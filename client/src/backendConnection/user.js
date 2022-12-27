const {default:backendConnection} = require('.');

export const register = async(user) => {
    try {
        const response = await backendConnection.post('/api/users/register',user);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}

export const loginUser =async(data)=>{
    try {
        const response = await backendConnection.post('/api/users/login',data);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}

export const getUserInfo = async()=>{
    try {
        const response = await backendConnection.post('/api/users/user-info');
        // console.log(response.data);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
}