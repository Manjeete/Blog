import React, {useState} from 'react'
import Link from 'next/link'


const ContactForm = () =>{

    const [values,setValues] = useState({
        message:'',
        name:'',
        email:'',
        sent:false,
        buttonText:'Send Message',
        success:false,
        error:false
    });

    const {message,name,email,sent,buttonText,success,error} = values

    const clickSubmit = e =>{
        e.preventDefault();
    }

    const handleChange = name => e =>{
        setValues({...values,[name]:e.target.value,error:false,success:false,buttonText:'Send Message'})
    }

    const contactForm = () =>{
        return (
            <form>
                <div className="form-group">
                    <label className="lead">Message</label>
                    <textarea onChange={handleChange('message')} type="text" className="form-control" value={message} required rows="8" ></textarea>
                </div>
                <div className="form-group">
                    <label className="lead">Email</label>
                    <input type="email" onChange={handleChange('email')} className="form-control" value={email} required />
                </div>
                <div className="form-group">
                    <label className="lead">Name</label>
                    <input type="text" onChange={handleChange('name')} className="form-control" value={name} required />
                </div>
                <div>
                    <button className="btn btn-primary">{buttonText}</button>
                </div>
            </form>
        )
    }


    return (
        <React.Fragment>
            {contactForm()}
        </React.Fragment>
    )
}


export default ContactForm;