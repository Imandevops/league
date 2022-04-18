const { createContext } = require('react');

const MainContext = createContext({
    bank: [],
    setBank: () => { },
    loadingDialog: false,
    setLoadingDialog: () => { },
    info: {},
    setInfo: () => { },
    handleGetInfo: () => { }
});

export default MainContext;
