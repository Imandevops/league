import axios from 'axios';
import { toastError } from '../util/ToastUtil';



// const logOut = () => {
//     document.cookie = 'n-session-id=1;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
//     window.location.href = '/';
// };

axios.interceptors.response.use(null, async (error) => {

    // if (error.response.status === 403 && error.response.config.url !== '/api/user/login' && error.response.config.url !== '/api/user/info' && error.response.config.url !== '/api/user/rpw' && error.response.config.url !== '/api/user/cpw') {
    //     logOut()
    //     return
    // }

    if (error.response.config.url !== '/api/user/login' && error.response.config.url !== '/api/user/info') {
        toastError(error.response.data.message);
        return Promise.reject(error)
    } else {
        return Promise.reject(error)
    }
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
    head: axios.head,
};
