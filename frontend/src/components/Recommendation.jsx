import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

function RecommendationModals(props) {
    const [recProduce, setRecProduce] = useState(''); // recommendation product to produce
    const [recRemove, setRecRemove] = useState(''); // recommendation product to remove
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);

    const formattedFirstDay = firstDayOfMonth.toISOString();
    const formattedLastDay = lastDayOfMonth.toISOString();

    const params = {
        brand_name: props.brand_name,
        time_start: formattedFirstDay,
        time_end: formattedLastDay
    };

    const fetchData = async () => {
        axios.post('http://localhost:5000/get_recommendation', params)
            .then((response) => {
                console.log('succeed');
                setRecProduce(response.data.product_to_produce || [])
                setRecRemove(response.data.product_to_remove || [])
            })
            .catch((error) => {
                console.error('error', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [props.brand_name]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{color:'black'}}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Recommendations
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={3} className="d-flex justify-content-center">
                        <Image src='/template/assets/images/supershy.png' fluid/>
                    </Col>
                    <Col>
                        <ul>
                            <li>
                                <p>{recProduce}</p>
                            </li>
                            <li>
                                <p>{recRemove}</p>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

function Recommendation({brand_name}) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Recommendation
            </Button>

            <RecommendationModals
                show={modalShow}
                onHide={() => setModalShow(false)}
                brand_name ={brand_name}
            />
        </>
    );
}

export default Recommendation;