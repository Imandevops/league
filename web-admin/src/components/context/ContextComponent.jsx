import React, { useEffect, useState } from 'react';
import HttpService from '../../service/HttpService';
import LoadingDialog from '../common/LoadingDialog';
import MainContext from './MainContext';

const ContextComponent = ({ children }) => {

    const [loadingDialog, setLoadingDialog] = useState(false);
    const [bank, setBank] = useState([]);
    const [info, setInfo] = useState()


    const handleGetBank = async () => {
        try {
            // let { data, status } = await HttpService.get(`/api/admin/baseData/?page=0&baseCode=001`);
            // if (status === 200) {
            //     setBank(data);
            // }
        } catch (ex) { }
    }

    useEffect(() => {
        handleGetBank()
    }, [])


    return (<MainContext.Provider value={{
        bank,
        setBank,
        loadingDialog,
        setLoadingDialog,
        info,
        setInfo,
    }}>
        <div>
            {loadingDialog ? <LoadingDialog showDialog={loadingDialog} closeDialog={() => setLoadingDialog(false)} /> : null}
            {children}
        </div>
    </MainContext.Provider>);
}

export default ContextComponent;