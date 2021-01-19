import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

const DISHMODEL = require('../models/dish.js');

/*
  props:
    onClickDone - callback function executed once finished
    onClickClose - callback function executed to close the modal
    modalHeader - display string for modal header
    show - flag to toggle the modal
    dish - the dish object to add/edit
*/
function DishModal(props) {

  const[dish, setDish] = useState();

  useEffect(() => {
    setDish(props.dish);
  }, [props.dish])

  function onChangeDish(e) {
    var name = [e.target.name][0]
    var value = e.target.value
    var changedDish = Object.assign({}, dish);
    changedDish[name] = value;
    setDish(changedDish);
  }

  return (
    <Modal
      show = {props.show}
      onHide = {props.onClickClose}
      size = "sm"
      backdrop = "static"
    >
      <Modal.Header closeButton>
        <Modal.Title as = "h5">
          {props.modalHeader}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dish === undefined || dish === null ?
          <Row>
            <Col style = {{textAlign: "center"}}>

            </Col>
          </Row>
        :
          <div>
            {DISHMODEL.dishMetadata.map((field, index) => {
              return (
                <Row key = {index}>
                  <Col>
                    <Form.Label> {field.displayName} </Form.Label>
                    <Form.Control
                      as = {field.inputType}
                      name = {field.value}
                      value = {dish[field.value]}
                      onChange = {(e) => {
                        onChangeDish(e);
                      }}
                    />
                  </Col>
                </Row>
              );
            })}
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant = "success" size = "sm"
          onClick = {() => {
            props.onClickDone(dish);
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DishModal;
