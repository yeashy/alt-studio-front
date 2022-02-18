import { Card, Button, ButtonGroup, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import $ from 'jquery';
import React, { useState } from "react";
import { deletePlacemarkRequestThunk, setPositionAC, updatePlacemarkRequestThunk } from "../store/mapReducer";

var PlacemarkListItem = (props) => {

    const dispatch = useDispatch();

    function deletePlacemark() {
        dispatch(deletePlacemarkRequestThunk(props.id));
    }

    function setNewPosition() {
        dispatch(setPositionAC(props.latitude, props.longitude));
    }

    //for Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let nameRef = React.createRef();
    let latitudeRef = React.createRef();
    let longitudeRef = React.createRef();

    function updatePlacemark() {
        let name = nameRef.current.value;
        let latitude = parseFloat(latitudeRef.current.value);
        let longitude = parseFloat(longitudeRef.current.value);

        if (latitude >= 90 || longitude >= 180 || latitude <= -90 || longitude <= -180) {
            $('#catcher').removeClass('d-none');
        }
        else {
            $('#catcher').addClass('d-none');
            handleClose();
            dispatch(updatePlacemarkRequestThunk(props.id, name, latitude, longitude));
        }
    }

    return (
        <>
            <Card id="placemark-item">
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center text-capitalize mb-0">
                        <p className="mb-0 col-7" onClick={setNewPosition}>{props.name}</p>
                        <ButtonGroup className="d-flex">
                            <Button variant="warning" onClick={(e) => {
                                e.stopPropagation();
                                handleShow();
                            }}>
                                <i className="fa-solid fa-pen"></i></Button>
                            <Button variant="danger" onClick={(e) => {
                                e.stopPropagation();
                                deletePlacemark();
                            }}>
                                <i className="fa-solid fa-trash"></i></Button>
                        </ButtonGroup>
                    </Card.Title>
                    <Card.Text className="text-secondary" onClick={setNewPosition}>
                        Широта: {props.latitude.toFixed(6)}<br /> Долгота: {props.longitude.toFixed(6)}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} className="overflow-auto">
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование точки</Modal.Title>
                </Modal.Header>
                <Form onSubmit={function (e) {
                    e.preventDefault();
                    updatePlacemark();
                }}>
                    <Modal.Body>
                        <Form.Label><strong>Название</strong></Form.Label>
                        <Form.Control type="text" required autoComplete="off" className="mb-2 h-25" defaultValue={props.name} ref={nameRef} maxLength="32"></Form.Control>
                        <Form.Label><strong>Широта</strong></Form.Label>
                        <Form.Control type="number" required autoComplete="off" className="mb-2 h-25" defaultValue={props.latitude} ref={latitudeRef} step="0.000001"></Form.Control>
                        <Form.Label><strong>Долгота</strong></Form.Label>
                        <Form.Control type="number" required autoComplete="off" className="h-25" defaultValue={props.longitude} ref={longitudeRef} step="0.000001"></Form.Control>
                        <p className="mb-0 text-center text-danger mt-1 d-none" id="catcher">Диапазон ±90 и ±180</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Отмена</Button>
                        <Button variant="success" type="submit">Сохранить</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default PlacemarkListItem;