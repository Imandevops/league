import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import CreatePlanRouter from './components/createPlan/CreatePlanRouter';
import Panel from './components/Panel';
import Management from './components/Management';



const PanelRouter = () => {

    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem('authtoken');
        if (!token) {
            history.replace("/");
        }
    });
    return (
        <Switch>
            
            <Route path='/panelRouter/panel' render={() => <Panel />} />
            <Route path='/panelRouter/createPlan' render={() => <CreatePlanRouter />} />
            <Route path='/panelRouter/management' render={() => <Management />} />

        </Switch>
    );
}

export default PanelRouter;