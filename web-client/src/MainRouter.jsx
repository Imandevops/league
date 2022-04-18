import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/home/Home';
import SecondLeague from './components/SecondLeague';
import ContextComponent from './components/context/ContextComponent'
import Login from './components/Login';
import AboutLeague from './components/AboutLeague';
import Gallery from './components/Gallery';
import CarouselTest from './components/carouseltest';
import PanelRouter from './PanelRouter';
import Downloads from './components/Downloads';
import SelectedProfiles from './components/SelectedProfiles';
import SelectedProfileView from './components/SelectedProfileView';
import CompleteNews from './components/CompleteNews';
import PanelIdEdit from './components/PanelIdEdit';

const MainRouter = () => {

    return (

        <ContextComponent>
            <Switch>
                <Route path='/panelIdEdit' render={() => <PanelIdEdit />} />
                <Route path='/downloads' render={() => <Downloads />} />
                <Route path='/SelectedProfiles' render={() => <SelectedProfiles />} />
                <Route path='/SelectedProfileView/:Id' render={(props) => <SelectedProfileView Id={props.match.params.Id} />} /> 
                <Route path='/CompleteNews/:newsId' render={(props) => <CompleteNews newsId={props.match.params.newsId} />} />                 
                <Route path='/carouselTest' render={() => <CarouselTest />} />
                <Route path='/gallery' render={() => <Gallery />} />
                <Route path='/about' render={() => <AboutLeague />} />
                <Route path='/SecondLeague' render={() => <SecondLeague />} />
                <Route path='/login' render={() => <Login />} />
                <Route path='/download' render={() => <Downloads />} />
                <Route path='/panelRouter' render={() => <PanelRouter />} />
                <Route path='/' exact render={() => <Home />} />
            </Switch>
        </ContextComponent>

    );
}

export default MainRouter;