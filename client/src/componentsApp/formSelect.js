import React from "react";
import "bootstrap/dist/css/bootstrap.css";
//import { Form, Row, Col } from "react-bootstrap";
const FormSelect = (props) => (
  <form className="formInputData" onSubmit={props.inputMethod} autoComplete="off">
    <div className="row">
      <div className="col">
        {/* <label for ="inputRegion">Регион</label> */}
        <input
          type="text"
          className="form-control"
          name="region"
          placeholder={"Region"}
        />
      </div>
      <div className="col">
        {/* <label for ="inputOrganiz">Организация</label> */}
        <input
          type="text"
          className="form-control"
          name="companyname"
          placeholder={"Сompany name"}
        ></input>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <input
          type="text"
          className="form-control"
          name="departmentname"
          placeholder={"Department"}
        ></input>
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          name="profession"
          placeholder={"Position"}
        ></input>
      </div>
    </div>
    <div className="row">
      <div style={{ maxWidth: "50vw" }} class="col">
        <input
          type="text"
          className="form-control"
          name="person"
          placeholder={"Employee"}
        ></input>
      </div>
    </div>

    <div className="signboardHeader">
      {" "}
      in the search fields enter incomplete information: (comparison will be
      used - contains ){" "}
    </div>
    <button className="selectButton1">Select ..</button>
  </form>
);
export default FormSelect;
