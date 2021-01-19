import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import DishModal from './DishModal.js';

const DISHMODEL = require('../models/dish.js');
const DISHCONTROLLER = require('../controllers/dishController.js');

function Dishes() {

  const[dishes, setDishes] = useState([]);
  const[modalDish, setModalDish] = useState();
  const[showDishModal, setShowDishModal] = useState(false);
  const[dishModalHeader, setDishModalHeader] = useState("");
  const[selectedDishId, setSelectedDishId] = useState("")

  function openDishModal(dish, modalHeader) {
    setModalDish(dish);
    setDishModalHeader(modalHeader);
    setShowDishModal(true);
  }

  function closeDishModal() {
    setModalDish();
    setDishModalHeader("");
    setShowDishModal(false);
  }

  function modalCompletionCallback(newDish) {
    if(newDish.name.trim().length === 0 ) {
      alert("Please enter a dish name");
      return;
    }
    const callbackOnError = (error) => {
      alert(error.message);
    }
    DISHCONTROLLER.createDish(dishes, newDish, setDishes, callbackOnError);
    closeDishModal();
  }

  function selectDish(id) {
    if(selectedDishId === id) {
      setSelectedDishId("");
    }
    else {
      setSelectedDishId(id);
    }
  }

  function deleteDish() {
    const callback = (changedDishes) => {
      setDishes(changedDishes);
      setSelectedDishId("");
    }
    const callbackOnError = (error) => {
      alert(error.message);
    }
    DISHCONTROLLER.deleteDish(dishes, selectedDishId, callback, callbackOnError);
  }

  return (
    <Container>
      <DishModal
        onClickDone = {modalCompletionCallback}
        onClickClose = {closeDishModal}
        modalHeader = {dishModalHeader}
        show = {showDishModal}
        dish = {modalDish}
      />
      <Row>
        <Col xs = {8}>
          <h5> Your Dishes 🍽️ </h5>
        </Col>
        <Col xs = {4} style = {{textAlign: "right"}}>
          <Button variant = "info" size = "sm" style = {{marginRight: "5px"}}
            onClick = {() => {openDishModal(Object.assign({}, DISHMODEL.dish), "Add Dish")}}
          >
            Add
          </Button>
          <Button variant = "info" size = "sm" disabled = {selectedDishId.length === 0}
            onClick = {deleteDish}
          >
            Delete
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr style = {{border: "1px solid #EAECEE"}} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
          {dishes.map((dish) => {
            return (
              <ListGroup.Item action key = {dish.id} variant = {selectedDishId === dish.id ? "warning" : ""}
                onClick = {() => {selectDish(dish.id)}}
              >
                {dish.name}
              </ListGroup.Item>
            );
          })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Dishes;
