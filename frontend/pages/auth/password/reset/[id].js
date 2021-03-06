import { useState } from "react";
import { resetPassword } from "../../../../actions/auth";
import { withRouter } from "next/router";

const ResetPassword = ({router}) =>{
    const [values, setValues] = useState({
        name:'',
        newPassword:'',
        error:'',
        message:'',
        showForm:true
    })

    const {showForm,name,newPassword,error,message} = values

    const handleSubmit = e =>{
        e.preventDefault()
        resetPassword({
            newPassword,
            resetPasswordLink:router.query.id
        }).then(data =>{
            if(!data.status){
                setValues({...values,error:data.msg,showForm:false,newPassword:''})
            }else{
                setValues({...values,message:data.msg,showForm:false,newPassword:'',error:false})
            }
        })
    }

    const showError = () =>(error ?<div className="alert alert-danger">{error}</div>:'');
    const showMessage = () =>(message ? <div className="alert alert-success">{message}</div>:'');

    const passwordResetForm = () =>(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group pt-5">
                    <input type="text" onChange={e => setValues({...values,newPassword:e.target.value})} className="form-control" value={newPassword} placeholder="Type your new password" required />
                </div>
                <div>
                    <button className="btn btn-primary">Change Password</button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="container-fluid">
            <h2>Reset password</h2>
            <hr />
            {showError()}
            {showMessage()}
            {showForm && passwordResetForm()}
        </div>
    )
}

export default withRouter(ResetPassword);