import axios from 'axios';
import { toastError } from '../util/ToastUtil';

const logOut = () => {
    window.localStorage.clear()
    window.location.href = '/';
};

const axiosApiInstance = axios.create();
axiosApiInstance.interceptors.request.use(function (req) {
    if (req.url !== '/api/league/iam/login') {
        const token = localStorage.getItem('authtoken');
        req.headers["authtoken"] = token;
    }
    return req;
}, function (err) { return Promise.reject(err) });

axios.interceptors.response.use(null, async (error) => {
    // const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
    //     originalRequest._retry = true;
    //     const refreshToken = localStorage.getItem("authrefreshtoken");
    //     const username = localStorage.getItem('username');

    //     // headers["refresh-token"] = refreshToken;
    //     const { status, headers } = await axios.post("/api/league/iam/login", { username, refreshToken })
    //     if (status == 200) {
    //         localStorage.setItem('authtoken', headers['authtoken']);
    //         localStorage.setItem('authrefreshtoken', headers["authrefreshtoken"]);
    //     }
    // }
    if (error.response.config.url !== '/api/league/iam/login') {
        toastError(error.response.data.message);
        return Promise.reject(error)
    }else{
        return Promise.reject(error)
        // return axiosApiInstance(error);
    }
    // return error;
});







//////---------------------------------------------------------------
// axios.interceptors.response.use(null, async (error) => {
// if (error.response.status === 403 && error.response.config.url !== '/api/user/login' && error.response.config.url !== '/api/user/info' && error.response.config.url !== '/api/user/rpw' && error.response.config.url !== '/api/user/cpw') {
//     logOut()
//     return
// }

// if (error.response.config.url !== '/api/user/login' && error.response.config.url !== '/api/user/info') {
//     toastError(error.response.data.message);
//     return Promise.reject(error)
// } else {
//     return Promise.reject(error)
// }
// });
////////////////////-------------------------------------------------

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
    head: axios.head,
    logOut
};
