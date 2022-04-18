const { createContext } = require('react');

const MainContext = createContext({
    loadingDialog: false,
    setLoadingDialog: () => { },
    profile: {},
    setProfile: () => { },
    createPlan: {},
    setCreatePlan: () => { },
    handleGetInfo: () => { },
    files: [],
    setFiles: () => { },

});

export default MainContext;
