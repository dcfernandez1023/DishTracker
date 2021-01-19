import React, { useState, useEffect } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function DishNavbar() {
  return (
    <div>
      <Navbar fluid style = {{backgroundColor: "#FDEBD0"}}>
        <Navbar.Brand href = "/">
          Dish Tracker
        </Navbar.Brand>
      </Navbar>
      <br/>
    </div>
  );
}

export default DishNavbar;
