import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = (props) => {
    const { setLoggedIn } = props

    const navigate = useNavigate()
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

    useEffect(() => {
        axios.get('/api/users/logout', {
            withCredentials: true
        })
        .then(resp => {
            localStorage.clear()
            setLoggedIn(false)
            setAlert({
                message: resp.data,
                status: 'success'
            })
            setTimeout(() => navigate('/'), 2000)
        })
        .catch(error => {
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
            setTimeout(() => navigate('/'), 2000)
        })
    }, [navigate])

    return alert.message && (
        <div className="container">
            <div className={'alert alert-' + alert.status}>
                {alert.message}
            </div>
        </div>
    )
}

export default Logout