import { useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row, Table} from "react-bootstrap";
import { NavLink } from 'react-router-dom';


let Musicollection = props => {
  return (
    <Col lg={12}>
      <Row>
        <Col>
          <NavLink to="/" >X</NavLink>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>
          Pagination
        </Col>
      </Row>
    </Col>
  )
}

export default Musicollection