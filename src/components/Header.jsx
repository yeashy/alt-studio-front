import { Container, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutRequestThunk } from '../store/mapReducer';

var Header = () => {

    let isLogged = useSelector(state => state.mapSection.user.isLogged);

    const dispatch = useDispatch();

    function whichText() {
        if (isLogged) return(
            <NavLink to="/" className="text-decoration-none text-light" onClick={handleExit}>Выйти</NavLink>
        );
        else return(
            <NavLink to="/login" className="text-decoration-none text-light">Войти</NavLink>
        );
    }

    function handleExit(){
        dispatch(logoutRequestThunk());
    }

    return (
        <Navbar bg="dark">
            <Container>
                <Navbar.Brand>
                    <NavLink to="/" className="text-decoration-none text-light">Главная</NavLink>
                </Navbar.Brand>
                <Navbar.Collapse className='justify-content-end'>
                    {whichText()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;