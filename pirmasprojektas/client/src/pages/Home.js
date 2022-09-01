import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = (props) => {

  const { loggedIn } = props

  const [books, setBooks] = useState([])
  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })

  const [refresh, setRefresh] = useState(false)
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/books/')
    .then(resp => {
      setBooks(resp.data)
        })
      
    .catch(error => {
      setAlert({
        message: error.response.data,
        status: 'danger'
      })
    })
  }, [refresh])

  const handleDelete = (id) => {
    if(isNaN(id) || !loggedIn)
      return
    
      axios.delete('/api/books/delete/' + id)
      .then(resp => {
        setAlert({
          message: resp.data.message,
          status: 'success'
        })
        setRefresh(!refresh)
        
        window.scrollTo(0, 0)
      })
      .catch(error => {
        console.log(error)
        setAlert({
          message: error.response.data,
          status: 'danger'
        })
        window.scrollTo(0, 0)

        if(error.response.status === 401)
        setTimeout(() => navigate('/login'), 2000)
      })
      .finally(() => {
        setTimeout(() => setAlert({
          message: '',
          status: ''
        }), 3000)
      })
     }

      const handleSearch = (e) => {
        e.preventDefault()
  
        if(keyword === '')
          return setRefresh(!refresh)
  
        axios.get('/api/books/search/' + keyword)
        .then(resp => {
          setBooks(resp.data)
        })
        .catch(error => {
          console.log(error)
          setAlert({
            message: error.response.data,
            status: 'danger'
          })
          window.scrollTo(0, 0)
        })
        .finally(() => {
          setTimeout(() => setAlert({
            message: '',
            status: ''
          }), 3000)
        })
      
    }

  return (
    <div className="container">
    {alert.message && (
      <div className={'alert alert-' + alert.status}>
        {alert.message}
      </div>
    )}
     <div className="filter mb-5">
          <form onSubmit={handleSearch}>
            <div className="form-group d-flex">
              <input 
                type="text" 
                placeholder="Search book" 
                onChange={(e) => setKeyword(e.target.value)}
                onBlur={(e) => {
                  if(keyword === '')
                    setRefresh(!refresh)
                }}
              />
              <button className="button">Search</button>
            </div>
          </form>
        </div>
    <div className="articles">
      {books.length > 0 && books.map(article => {
        return (

          <div className="card">
          <div key={article.id} className='box'>
            <div className='card-image'>
              <img src={article.image} alt={article.title} />
            </div>
            <div className='card-body'>
               <h3 className="card-title">{article.title}</h3>
               <h5 className="card-author">{article.author}</h5>
               <h6 className="card-cover-author">{article.cover_author}</h6>
               <h6 className='card-isbncode'>{article.ISBN_code}</h6>
               <div className="controls">
               <Link to={'/book/' + article.id} className="read-more">Read more...</Link>
               {loggedIn &&
               <div className="controls">
                <div className='admin-controls'>
               <Link to={'/edit/' + article.id} className="admin-edit">Edit</Link>
               <button onClick={() => handleDelete(article.id)} className="admin-delete">Delete</button>
               </div>
               </div>
               }
               </div>
            </div>
          </div>
          </div>
          
        )
      })}

    </div>
    </div>
  );
}

export default Home