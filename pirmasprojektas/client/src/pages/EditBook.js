import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditBook = () => {
    const { id } = useParams()
    const [book, setBook] = useState({
        title: '',
        author: '',
        cover_author: '',
        ISBN_code: '',
        content: '',
        image: ''
    })

    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/books/' + id)
        .then(resp => {
            if(!resp.data) {
                navigate('/')
                return
            }

            setBook(resp.data)
        })
        .catch(error => {
            console.log(error)
            navigate('/')
        })
    }, [])

    const handleForm = (e) => {
        setBook({...book, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/books/edit/' + id, book)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            window.scrollTo(0, 0)

            setTimeout(() => navigate('/'), 2000)
        })
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.resonse.data,
                status: 'danger'
              })
              window.scrollTo(0, 0)
      
              if(error.response.status === 401)
              setTimeout(() => navigate('/login'), 1000)
        })

    }
    return(
        <div className="container">
        <h1>Edit Book</h1>
        {alert.message && (
                <div className={'alert alert-' + alert.status}>
                {alert.message}
                </div>
            )}
              <form onSubmit={(e) => handleSubmit(e)}>
              <div>
              
              <input type="text" name="title" placeholder='Title' onChange={(e) => handleForm(e)} value={book.title}/>
              </div>
              <div>
              
              <input type="text" name="author" placeholder='Author' onChange={(e) => handleForm(e)} value={book.author}/>
              </div>
              <div>
             
              <input type="text" name="cover_author" placeholder='Cover author' onChange={(e) => handleForm(e)} value={book.cover_author}/>
              </div>
              <div>
             
              <input type="number" name="ISBN_code" placeholder='ISBN number' onChange={(e) => handleForm(e)} value={book.ISBN_code}/>
              </div>
              <div>
              <div>
    
              <textarea type="text" name="content" placeholder='Content' onChange={(e) => handleForm(e)} value={book.content}/>
              </div>
             
              <input type='file' name="content" placeholder='Content' onChange={(e) => handleForm(e)}></input>
              </div>
          <button className="button">Confirm</button>
      </form>
    </div>
    )
}

export default EditBook

