import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';

const AlertDialog = ({ showDialog, closeDialog, neededToUploadFiles }) => {

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

				<div className="container d-flex flex-column justify-content-center align-items-center">
					<p className="w-100 text-center p-3"><span className="m-3 h6">آیا نیاز به بارگذاری مجدد پیوست‌های تکمیلی و الزامی دارید؟</span></p>
					<div className="d-flex mt-3"><a className="btn btn-success text-white ms-3 px-5" onClick={closeDialog}>بلی</a><a className="btn btn-danger text-white px-5" onClick={neededToUploadFiles}>خیر</a></div>
				</div>

			</DialogContent>
		</DialogOverlay>);
}

export default AlertDialog;