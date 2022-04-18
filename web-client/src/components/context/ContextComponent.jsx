import React, { useState } from 'react';
import LoadingDialog from '../common/LoadingDialog';
import MainContext from './MainContext';

const ContextComponent = ({ children }) => {

    const [loadingDialog, setLoadingDialog] = useState(false);
    const [files, setFiles] = useState([])
    const [profile, setProfile] = useState({})
    const [createPlan, setCreatePlan] = useState({})

    return (<MainContext.Provider value={{
        loadingDialog,
        setLoadingDialog,
        profile,
        setProfile,
        createPlan,
        setCreatePlan,
        files,
        setFiles
    }}>
        <div>
            {loadingDialog ? <LoadingDialog showDialog={loadingDialog} closeDialog={() => setLoadingDialog(false)} /> : null}
            {children}
        </div>
    </MainContext.Provider>);
}

export default ContextComponent;