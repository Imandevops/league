import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import ContextComponent from './context/ContextComponent';
import MainDashboard from './dashboard/MainDashboard';
import LoginForm from './signin/Login';


const MainRouter = () => {

    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('authtoken');
        if (!token) {
            history.replace("/");
        }
    });

    return (
        <ContextComponent>
            <Switch>
                <Route path='/dashbord' render={() => <MainDashboard />} />
                <Route path='/' exact render={() => <LoginForm />} />
            </Switch>
        </ContextComponent>);
}

export default MainRouter;