import { Link } from 'react-router-dom'
import logo from './logo2.png'
import './Header.css'




const Header = (props) => {
    const { loggedIn } = props 

    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <h1 className="fs-4"><img src={logo} alt="PravalTour"></img></h1>
            </Link>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/" className="nav-link" aria-current="page">Home</Link>
                </li>
               
                {loggedIn ? (
                <>
                <li className="nav-item">
                     <Link to="/new-post" className="nav-link" aria-current="page">Add Book</Link>
                 </li>
                 <li className="nav-item">
                     <Link to="/logout" className="nav-link" aria-current="page">Log Out</Link>
                 </li>
                 </>
                ) : (
                    <>
                <li className="nav-item">
                    <Link to="/register" className="nav-link" aria-current="page">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-current="page">Log In</Link>
                </li>
                </>
                )}
            </ul>
            </header>
        </div>
    
    )
}

export default Header