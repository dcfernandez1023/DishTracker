import React, { useState, useEffect } from 'react';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Dishes from './views/Dishes.js';
import DishNavbar from './views/DishNavbar';

function App() {
  return (
    <Container fluid>
      <DishNavbar/>
      <Row>
        <Col>
          <Dishes/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
