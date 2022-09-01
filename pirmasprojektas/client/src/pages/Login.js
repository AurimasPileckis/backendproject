import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {

    const { setLoggedIn } = props
    
        const [form, setForm] = useState({
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
    
            axios.post('/api/users/login', form)
            .then(resp => {
                localStorage.setItem('loggedin', true)
                setLoggedIn(true)

                setAlert({
                    message: resp.data,
                    status: 'success'
                })
                setTimeout(() => {
                navigate('/')
                }, 1000)
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
         <form className="register-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            
                
                <input className='input-register' type='email' name='email' placeholder='E-mail' onChange={handleForm}/>
            
            
                
                <input className='input-register' type='password' name='password' placeholder='Password' onChange={handleForm} />
        
                <div className='button1'>
                <button className="btn-log">Login</button>
            </div>
            </form>
        </div>
    )
}

export default Login