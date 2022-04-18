
import React, { useContext, useState } from 'react';
import logo from '../static/images/logo.png'
import HttpService from '../service/HttpService'
import MainContext from '../components/context/MainContext'
import { useHistory } from 'react-router';
import { toastError } from '../util/ToastUtil';
import ForgotDialog from './dialog/ForgotDialog';

const LoginForm = () => {
  const [forgotDialog, setForgotDialog] = useState(false);
  const { setProfile } = useContext(MainContext)
  const history = useHistory()

  async function handleLogin(e) {

    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const body = { username, password }

    try {
      let { data, status, headers } = await HttpService.post('/api/league/iam/login', body)
      if (status === 200) {
        setProfile(data)
        // localStorage.setItem('data', data);
        // localStorage.setItem('headers', headers);

        localStorage.setItem('username', data.username);
        localStorage.setItem('name', data.name + " " + data.family);
        localStorage.setItem('companyName', data.companyName);
        localStorage.setItem('companyNamePer', data.companyNamePer);
        localStorage.setItem('abb', data.abb);
        localStorage.setItem('authtoken', headers.authtoken);
        localStorage.setItem('authrefreshtoken', headers.authrefreshtoken);
        if (data.type === "ceo") {
          history.push('/panelRouter/management')
        } else {
          history.push('/panelRouter/panel')
        }
      }
    } catch (ex) { 
      toastError(ex.response.data.message);
    }
  }

  const handleLoadForgotDialog = (e)=> {
    e.preventDefault()
    setForgotDialog(true)
}


  return (<div>
       {forgotDialog ?
                <ForgotDialog
                    showDialog={forgotDialog}
                    closeDialog={() => setForgotDialog(false)}
                /> : null}

    <form className='form-class d-flex mx-auto card mt-5 shadow justify-content-center align-items-center '>
      <div className='container text-center  mb-5'>
        {/* <h5 className='mb-5 mt-4 text-center'>لیگ نوآوری</h5> */}
        <img className="mb-3 mt-5 ms-2 me-2 image-size" src={logo} alt="" />
        <div className=" mb-3 mx-5">
          <label for="disabledTextInput" className="form-label ">نام کاربری</label>
          <input type="text" id="username" className="form-control" />
        </div>
        <div className="mb-3 mx-5">
          <label for="disabledSelect" className="form-label ">کلمه عبور</label>
          <input type="password" id="password" className="form-control" />
        </div>

        <div className='d-flex mt-5 mb-4  justify-content-center'>
          <button type="submit" className="btn btn-primary px-5 ms-2 flex-grow-1 me-5" onClick={e => handleLogin(e)}>ورود</button>
          <button  className="btn  forgotbtn me-2 flex-grow-1 ms-5" onClick={e=>handleLoadForgotDialog(e)} >فراموشی رمز عبور  </button>
        </div>
        
      </div>
    </form>
    </div>

  );
}

export default LoginForm;