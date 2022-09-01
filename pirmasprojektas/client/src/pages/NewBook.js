import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NewBook = () => {
    const [bookForm, setBookForm] = useState({
        title: '',
        author: '',
        cover_author: '',
        content: '',
        ISBN_code: '',
        image: '',
    })

    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })
    const navigate = useNavigate()

    const handleForm = (e) => {
        setBookForm({...bookForm, [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value})
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const form = new FormData()

        for(const key in bookForm) {
            form.append(key, bookForm[key])

        }
        axios.post('/api/books/', form)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            window.scrollTo(0, 0)

            setTimeout(() => navigate('/'), 2000)
        })
        .catch(error => {
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })

    }

    return (
        <div className="container">
            <h1>Add New Book</h1>
            {alert.message && (
                <div className={'alert alert-' + alert.status}>
                {alert.message}
                </div>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                    <input type="text" name="title" placeholder='Title' onChange={(e) => handleForm(e)} />
                    </div>
                    <div>
                    <input type="text" name="author" placeholder='Author' onChange={(e) => handleForm(e)} />
                    </div>
                    <div>
                    <input type="text" name="cover_author" placeholder='Cover Author' onChange={(e) => handleForm(e)} />
                    </div>
                    <div>
                    <textarea type="text" name="content" placeholder='Plot' onChange={(e) => handleForm(e)} />
                    </div>
                    <div>
                    <input type="number" name="ISBN_code" placeholder='ISBN Code' onChange={(e) => handleForm(e)} />
                    </div>
                    <label>Add image</label>
                    <div>
                    <input type="file" name="image" onChange={(e) => handleForm(e)} />
                    </div>
                <button className="button">Confirm</button>
                
            </form>
        </div>
    )
}

export default NewBook