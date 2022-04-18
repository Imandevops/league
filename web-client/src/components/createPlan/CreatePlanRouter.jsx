import React from 'react';
import { Route, Switch } from "react-router";
import { NavLink } from 'react-router-dom';
import Header from '../common/Header';
import Navbar from '../common/Navbar';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const CreatePlanRouter = () => {

  return (

    <div className='container'>
      <Navbar />
      <div className="line-navbar"></div>
      <Switch>
        <Route path='/panelRouter/createPlan/step1/:planId/:callbackState' render={(props) => <Step1 planId={props.match.params.planId} callbackState={props.match.params.callbackState} />} />
        <Route path='/panelRouter/createPlan/step1' render={() => <Step1 />} />
        <Route path='/panelRouter/createPlan/step2/:planId' render={(props) => <Step2 planId={props.match.params.planId} />} />
        <Route path='/panelRouter/createPlan/step2' render={() => <Step2 />} />
        <Route path='/panelRouter/createPlan/step3/:planId' render={(props) => <Step3 planId={props.match.params.planId} />} />
        <Route path='/panelRouter/createPlan/step3' render={() => <Step3 />} />
      </Switch>
    </div>
  );
}

export default CreatePlanRouter;