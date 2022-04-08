import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormLogin from "./FormLogin";

const ModalRegistration = (props) => {
  //console.log(props.buttonLabel);
  const [modal, setModal] = useState(false);
  const [buttonLabel] = useState("Login в 'Phone book'");
  const [login, setLogin] = useState(false);
  const [buttonLogin, setButtonLogin] = useState(true);

  const toggle = () => setModal(!modal);

  const [loginF, setLoginF] = useState(true);

  const visibleToggleModal = (res) =>(
    setModal(!res),
    setLogin(res),
    setButtonLogin(!res),
    props.visibleToggleLedgerWindow(res),
    setLoginF(res)
    //console.log("Loginf" + " " + loginF)
  );

  return (
    <div>
      {buttonLogin === true ? (
        <div className="header-login">
          <Button
            style={{
              marginRight: "10px",
              marginTop: "3px",
              marginBotton: "auto",
              backgroundColor: "blue",
            }}
            className="btn btn-primary"
            onClick={toggle}
          >
            {buttonLabel}
          </Button>
        </div>
      ) : (
        undefined
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal window</ModalHeader>
        <ModalBody> 
          <FormLogin visibleToggleModal={visibleToggleModal}/>
          <b>
            {login === true ? (
              <div> Login - Успешно! </div>
            ) : loginF === false ? (
              <div>
                the entered data did not pass verification! access denied{" "}
              </div>
            ) : (
              <div> </div>
            )}
          </b>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalRegistration;
