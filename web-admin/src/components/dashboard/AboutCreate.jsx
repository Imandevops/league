import React, { useState } from 'react';
import AboutLeagueDialog from '../dialogs/AboutLeagueDialog';

const AboutCreate = () => {


    const [aboutLeagueDialog, setAboutLeagueDialog] = useState(false)
    const [description, setDescription] = useState('')
    
    function handleGoToPreview() {

        setAboutLeagueDialog(true)        
        const descriptionText = document.getElementById('content-description1').value;
        setDescription(descriptionText)

    }



    return ( 

        <div className='container'>

        {aboutLeagueDialog ?
            <AboutLeagueDialog
                description={description}
                showDialog={aboutLeagueDialog}
                closeDialog={() => setAboutLeagueDialog(false)}
            /> : null}


        <p className='font-weight-bolder mt-3 mb-3 h6 m-2'>متن درباره لیگ:</p>
        <textarea className=' border p-3 w-100 contentTextArea' id='content-description1'  />
        <div className='d-flex justify-content-end mt-3'>
            <button className='buttonViewStyle' onClick={handleGoToPreview} >پیش نمایش</button>
        </div>

    </div>


        


     );
}
 
export default AboutCreate;