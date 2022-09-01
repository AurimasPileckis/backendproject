import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const SingleBook = () => {
    const [book, setBook] = useState({})
    const { id } = useParams()
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
        .catch((error) => {
            console.log(error)
            navigate('/')
        })
    }, [])

    return (
        <div className="container">
        <div className="single-post">
            <h1>{book.title}</h1>
            <div className="author">Author: {book.author}</div>
            <div className="cover">Cover author: {book.cover_author}</div>
            <div className="isb">ISBN number: {book.ISBN_code}</div>
            <div className="plot">Plot: {book.content}</div>
        </div>
        <Link to="/" className='button'>Back</Link>
    </div>
    ) 
}

export default SingleBook