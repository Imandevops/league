import React, { useContext } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Menu from './Menu';
import { Route, Switch } from 'react-router';
import MainContext from './../context/MainContext';
import PlanReview from './PlanReview';
import FormData from './FormData';
import UserDefinition from './UserDefinition';
import NewSelectedProfile from './NewSelectedProfile';
import SelectedProfiles from './SelectedProfiles';
import SelectedProfileCorrection from './SelectedProfileCorrection';
import Judges from './Judges';
import User from './User';
import ViewUser from './ViewUser';
import EditUser from './EditUser';
import NewJudges from './NewJudges';
import AboutLeague from './AboutLeague';
import AboutCreate from './AboutCreate';
import InfoPic from './InfoPic';
import InfoCreate from './InfoCreate';
import News from './News';
import NewsCreate from './NewsCreate';
import TextInfo from './TextInfo';
import TextInfoCreate from './TextInfoCreate';
import Winners from './Winners';
import NewWinner from './NewWinner';
import Gallery from './Gallery';
import NewGallery from './NewGallery';
import NewsCorrection from './NewsCorrection';
import PlanOwners from './PlanOwners';
import PlanExpertInfo from './PlanExpertInfo';
import PlanView from './PlanView';

const MainDashboard = () => {


    const { setLoadingDialog } = useContext(MainContext)


    


    return (

        <div className=''>
            <Header />
            <div className='d-flex h-100'>
                <Menu />
                <div className='w-100 admin-card'>
                    <Switch>
                        <Route path='/dashbord/viewUser' render={() => <ViewUser />} />
                        <Route path='/dashbord/user/:judgeId' render={(props) => <User judgeId={props.match.params.judgeId} />} />
                        <Route path='/dashbord/newjudges' render={() => <NewJudges />} />
                        <Route path='/dashbord/planReview' render={() => <PlanReview />} />
                        <Route path='/dashbord/judges' render={() => <Judges />} />
                        <Route path='/dashbord/formData/:planId' render={(props) => <FormData planId={props.match.params.planId} />} />
                        <Route path='/dashbord/userDefinition' render={() => <UserDefinition />} />
                        <Route path='/dashbord/viewUserId/:userId' render={(props) => <EditUser userId={props.match.params.userId} />} />
                        <Route path='/dashbord/aboutLeague' render={() => <AboutLeague />} />
                        <Route path='/dashbord/aboutCreate' render={() => <AboutCreate/>} />
                        <Route path='/dashbord/infoPic' render={() => <InfoPic/>} />
                        <Route path='/dashbord/infoCreate' render={() => <InfoCreate/>} />
                        <Route path='/dashbord/news' render={() => <News/>} />
                        <Route path='/dashbord/newsCreate' render={() => <NewsCreate/>} />
                        <Route path='/dashbord/newsCorrection/:newsId' render={(props) => <NewsCorrection newsId={props.match.params.newsId} />} />
                        <Route path='/dashbord/textInfo' render={() => <TextInfo/>} />
                        <Route path='/dashbord/textInfoCreate' render={() => <TextInfoCreate/>} />
                        <Route path='/dashbord/winners' render={() => <Winners/>} />
                        <Route path='/dashbord/newWinner' render={() => <NewWinner/>} />
                        <Route path='/dashbord/gallery' render={() => <Gallery/>} />
                        <Route path='/dashbord/newGallery' render={() => <NewGallery/>} />
                        <Route path='/dashbord/NewSelectedProfile' render={() => <NewSelectedProfile/>} />
                        <Route path='/dashbord/SelectedProfiles' render={() => <SelectedProfiles/>} />
                        <Route path='/dashbord/PlanOwners' render={() => <PlanOwners/>} />
                        <Route path='/dashbord/PlanExpertInfo' render={() => <PlanExpertInfo/>} />
                        <Route path='/dashbord/PlanView/:planId' render={(props) => <PlanView planId={props.match.params.planId}/>} />
                        <Route path='/dashbord/SelectedProfileCorrection/:Id' render={(props) => <SelectedProfileCorrection Id={props.match.params.Id} />} />                        
                        
                        
                    </Switch>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainDashboard;