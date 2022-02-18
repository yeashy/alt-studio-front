import { Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

var Greetings = () => {
    return (
        <Container style={{ height: 'calc(100% - 50px)' }} className="py-3">
            <div className="alert alert-secondary mt-3" id="greetings">

                <h3 className="text-center mb-4">Приветствуем в приложении, где можно ставить метки на карте!</h3>
                <p className="col-8 mb-0">
                    Здесь можно не только ставить метки, но и удалять, а так же редактировать! Ещё здесь можно&#160;
                    <NavLink to="/register" className="text-dark"><b>зарегистрироваться</b></NavLink> или <NavLink to="/login" className="text-dark"><b>войти!</b></NavLink><br /><br />
                    Без аккаунта тут делать, конечно, нечего. Только читать этот текст. Так что смело логиньтесь или регистрируйтесь, чтобы начать работу.<br /><br />
                    В общем, развлекайтесь.
                </p>

            </div>
        </Container>
    )
}

export default Greetings;