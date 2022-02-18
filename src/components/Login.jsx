import { Card, Form, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from "react";
import Header from "./Header";
import { loginRequestThunk } from "../store/mapReducer";
import SuccessNote from "./SuccessNote";


var Login = () => {

    let usernameRef = React.createRef();
    let passwordRef = React.createRef();

    const dispatch = useDispatch();

    function handleSubmit() {
        dispatch(loginRequestThunk(usernameRef.current.value, passwordRef.current.value));
    }

    return (
        <>
            <Header />
            <Container className="align-items-center d-flex mt-3 flex-column">
                <Card className="col-6 mb-3" id="form">
                    <Card.Header className="text-uppercase justify-content-center d-flex"><strong>Вход</strong></Card.Header>
                    <Form onSubmit={function (e) {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label><strong>Логин</strong></Form.Label>
                                <Form.Control type="text" required autoComplete="off" className="mb-3" ref={usernameRef} maxLength="32"></Form.Control>
                                <Form.Label><strong>Пароль</strong></Form.Label>
                                <Form.Control type="password" required autoComplete="off" className="mb-3" ref={passwordRef} maxLength="32"></Form.Control>
                            </Form.Group>
                            <p className="mb-0 text-center text-danger d-none error">Неверное имя пользователя или пароль.</p>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-between">
                            <Button variant="success" type="submit">Войти</Button>
                            <NavLink to="/register" className="text-light text-decoration-none">
                                <Button variant="secondary" type="reset">Регистрация</Button>
                            </NavLink>
                        </Card.Footer>
                    </Form>
                </Card>

                <SuccessNote type="login" />
            </Container>
        </>
    )
}

export default Login;