import React from "react";
import { useDispatch } from "react-redux";
import { Card, Form, Button, ListGroup } from "react-bootstrap";
import $ from 'jquery';
import { addPlacemarkRequestThunk } from "../store/mapReducer";
import PlacemarkListItem from "./PlacemarkListItem";

var LeftMenu = (props) => {

    let latitudeRef = React.createRef();
    let longitudeRef = React.createRef();
    let nameRef = React.createRef();

    const dispatch = useDispatch();

    function addPlacemark() {
        let name = nameRef.current.value;
        let latitude = parseFloat(latitudeRef.current.value);
        let longitude = parseFloat(longitudeRef.current.value);

        if (latitude >= 90 || longitude >= 180 || latitude <= -90 || longitude <= -180) {
            $('#error').removeClass('d-none');
        }
        else {
            $('#error').addClass('d-none');
            dispatch(addPlacemarkRequestThunk(name, latitude, longitude));
        }
    }

    return (
        <div className="d-flex col-4 flex-column" id="left-menu">
            <Card className="col-12">
                <Form onSubmit={function (e) {
                    e.preventDefault();
                    addPlacemark();
                }}>
                    <Card.Body>
                        <Form.Control type="text" required autoComplete="off" className="mb-2 h-25" placeholder="Название" ref={nameRef} maxLength="32"></Form.Control>
                        <Form.Control type="number" required autoComplete="off" className="mb-2 h-25" placeholder="Широта" ref={latitudeRef} step="0.000001"></Form.Control>
                        <Form.Control type="number" required autoComplete="off" className="h-25" placeholder="Долгота" ref={longitudeRef} step="0.000001"></Form.Control>
                        <p className="mb-0 text-center text-danger mt-1 d-none" id="error">Диапазон ±90 и ±180</p>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between align-items-center px-2">
                        <Button variant="success" type="submit">Добавить</Button>
                        <i className="fas fa-spinner fa-spin h-50 d-none" id="loading"></i>
                        <Button variant="secondary" type="reset">Очистить</Button>
                    </Card.Footer>
                </Form>
            </Card>

            <Card className="overflow-auto">
                <ListGroup variant="flush">
                    {
                        props.placemarks.map(value => {
                            return (
                                <ListGroup.Item className="p-0" key={value.id}><PlacemarkListItem name={value.name} id={value.id} latitude={value.latitude} longitude={value.longitude} key={value.id} /></ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </Card>
        </div>
    )
}

export default LeftMenu;