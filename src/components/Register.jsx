import { Card, Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import $ from 'jquery';
import React from "react";
import Header from "./Header";
import { registerRequestThunk } from "../store/mapReducer";
import SuccessNote from "./SuccessNote";

var Register = () => {

    let usernameRef = React.createRef();
    let passwordRef = React.createRef();
    let confirmRef = React.createRef();

    const dispatch = useDispatch();

    function handleSubmit() {
        dispatch(registerRequestThunk(usernameRef.current.value, passwordRef.current.value));
    }

    function checkInput() {
        if (passwordRef.current.value !== confirmRef.current.value) {
            $('.error').html('Пароли не совпадают.');
            $('.error').removeClass('d-none');
            return false;
        }
        else if (usernameRef.current.value.match(/^[a-zA-Z0-9]+$/) === null) {
            $('.error').html('Имя может содержать только буквы латиницы и цифры.');
            $('.error').removeClass('d-none');
            return false;
        }
        else {
            $('.error').addClass('d-none');
            return true;
        }
    }

    return (
        <>
            <Header />
            <Container className="justify-content-center d-flex mt-3">
                <Card className="col-6" id="form">
                    <Card.Header className="text-uppercase justify-content-center d-flex"><strong>Регистрация</strong></Card.Header>
                    <Form onSubmit={function (e) {
                        e.preventDefault();
                        if (checkInput()) {
                            handleSubmit();
                        }
                    }}>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label><strong>Юзернейм</strong> </Form.Label>
                                <Form.Control type="text" required autoComplete="off" className="mb-3" ref={usernameRef} maxLength="32"></Form.Control>
                                <Form.Label><strong>Пароль</strong></Form.Label>
                                <Form.Control type="password" required autoComplete="off" className="mb-3" ref={passwordRef} maxLength="32"></Form.Control>
                                <Form.Label><strong>Повторите пароль</strong></Form.Label>
                                <Form.Control type="password" required autoComplete="off" className="mb-3" ref={confirmRef} maxLength="32"></Form.Control>
                            </Form.Group>
                            <p className="mb-0 text-center text-danger d-none error"></p>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-between">
                            <Button variant="success" type="submit" className="col-md-4 col-6">Зарегистрироваться</Button>
                            <Button variant="secondary" type="reset">Очистить</Button>
                        </Card.Footer>
                    </Form>
                </Card>

                <SuccessNote type="register" />
            </Container>
        </>
    )
}

export default Register;