import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import HttpService from '../../service/HttpService';
import { toastError, toastSuccess } from '../../util/ToastUtil';



const ForgotDialog = ({ showDialog, closeDialog }) => {


	async function handleSubmitUsername(e) {
		e.preventDefault()

		const username = document.getElementById('username1').value

        const body = { username }
		
        try {
            const { status } = await HttpService.put(`/api/league/iam/resetpass/${username}`, body)

            if (status === 204) {
                toastSuccess("درخواست تغییر رمز با موفقیت ثبت شد")
				closeDialog(true)
            }

        } catch (error) {
            toastError(error.response.data.message);
        }
    }
   

    return (
        <DialogOverlay
            isOpen={showDialog}
            onDismiss={closeDialog}
            className="d-flex justify-content-center align-items-center"
            style={{ background: 'rgb(53 53 53 / 62%)' }}
        >
            <DialogContent style={{
                borderRadius: '3px',
                boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)',
                height: 'unset',
                maxWidth: '1200px',
                width: '40%',
                margin: 'auto'
            }}>


<div className="row align-items-center justify-content-center w-100 g-0 ">  
			<div className="col-lg-12 col-md-12 py-8 py-xl-0">
			
				<div className="">
				
					<div className="card-body p-6">
						<div className="mb-4">
							{/* <a href="../index.html"><img src="../assets/images/brand/logo/logo-icon.svg" className="mb-4" alt=""/></a> */}
							<h4 className="mb-1 fw-bold"> فراموشی رمز عبور</h4>
							<p>برای بازیابی رمز عبور نام کاربری خود را وارد کنید.</p>
						</div>
							
						<form>
							
							<div className="mb-3">
								{/* <label for="text" className="form-label">نام کاربری</label> */}
								<input type="text" id="username1" className="form-control" name="username" placeholder="نام کاربری    " required=""/>
							</div>
							
							<div className="mb-3 d-grid">
								<button type="submit" className="btn btn-primary" onClick={(e)=>handleSubmitUsername(e)}>
									ارسال درخواست
								</button>
							</div>
							{/* <span>بازگشت به <a href="/login" >ورود</a></span> */}
						</form>
					</div>
				</div>
			</div>
		</div>





            </DialogContent>
        </DialogOverlay>);
}

export default ForgotDialog;