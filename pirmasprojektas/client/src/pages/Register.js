import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })

    const [alert, setAlert] = useState({
      message: '',
      status: ''
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/users/register', form)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })
            setTimeout(() => navigate('/login'), 1000)
        })
        .catch (error => {
            setAlert({
            message: error.response.data,
            status: 'danger'
        })

        })
    }
    return (
        <div className='container'>
             {alert.message && (
      <div className={'alert alert-' + alert.status}>
        {alert.message}
      </div>
    )}
            <h1>Sign Up</h1>
            
            <form className="register-form"  onSubmit={handleSubmit}>
            
                
                <input className="input-register" type='text' name='first_name' placeholder="First Name" onChange={handleForm} />
            
           
               
                <input className="input-register" type='text' name='last_name' placeholder="Last Name" onChange={handleForm} />
           
          
            
                <input className="input-register" type='email' name='email' placeholder="E-mail" onChange={handleForm} />
            
            
               
                <input className="input-register"  type='password' name='password' placeholder="Password" onChange={handleForm} />
            <div className='button1'>
                <button className="btn-reg">Register</button>
            </div>
            </form>
           
        </div>
    )
}
export default Register