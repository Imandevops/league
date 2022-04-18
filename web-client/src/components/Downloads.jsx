import React, { useContext, useEffect, useState } from 'react';
import Header from './common/Header';
import filedwn from '../static/images/filedwn.png';
import HttpService from '../service/HttpService';
import { toastError } from '../util/ToastUtil';
import MainContext from './context/MainContext';

const Downloads = () => {

    const [urls, setUrls] = useState([]);
    const { setLoadingDialog } = useContext(MainContext)


    async function getUrlDownloads() {

        try {
            setLoadingDialog(true)
            const { data, status } = await HttpService.get('/api/league/downloads')
            if (status === 200) {
                setUrls(data)
                setLoadingDialog(false)
            }
          
        } catch (error) { toastError(error.response.data.message); }
    }

    useEffect(() => {
        getUrlDownloads()
    }, [])

    return (

        <div>
            <Header />
            <div className='container mt-5'>

                <div className="d-flex justify-content-center flex-column flex-lg-row">

                    {urls.map((url, index) =>
                        <a href={url} target="_blank" className="my_card d-flex justify-content-center align-items-center p-2 m-2 cursor-pointer">
                            <img src={filedwn} className='secondlaugueimg' />
                            {/* <p className="h5 font-weight-bolder m-2"> آیتم شماره {index + 1}</p> */}
                            <p className="h5 font-weight-bolder m-2"> {url.substring(url.lastIndexOf('/') + 1)}</p>
                        </a>
                    )}

                </div>
            </div>


        </div>


    );

}

export default Downloads;