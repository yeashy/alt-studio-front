import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

var SuccessNote = (props) => {

    function whichText(){
        if(props.type === 'login') return 'Вы успешно вошли.';
        else return 'Вы успешно зарегистрировались.'
    }

    return (
        <div className=" d-flex align-items-center flex-column alert alert-success d-none" id="success">
            <p>{whichText()}</p>
            <NavLink to="/" className="text-light text-decoration-none"><Button variant="success">На главную</Button></NavLink>
        </div>
    )
}

export default SuccessNote;