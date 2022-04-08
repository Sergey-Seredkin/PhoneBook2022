import React from "react";
const Phonewindow = (props) =>{
 
  // render() {
    var styleFormSelect = "";
      props.allInput === true
        ? (styleFormSelect = "wrapperXL mx-auto mt-6 ")
        : (styleFormSelect = "wrapper mx-auto mt-6");
        console.log("all / not all " + styleFormSelect);
   
   
    return (
      <div className={styleFormSelect}>
        <table className="table table-success table-striped table-hover table-bordered table-sm">
          <thead className="sticky" style={{ background: "#fff" }}>
            <tr>
              <th scope="col" style={{ background: "#fff" }}>
                #
              </th>
              <th scope="col" style={{ background: "#fff" }}>
              Employee
              </th>
              <th scope="col" style={{ background: "#fff" }}>
              Phone
              </th>
              <th scope="col" style={{ background: "#fff" }}>
              Mobile
              </th>
              <th scope="col" style={{ background: "#fff" }}>
              Position
              </th>
              <th scope="col" style={{ background: "#fff" }}>
              Subdivision
              </th>
              <th scope="col" style={{ background: "#fff" }}>
              Organization
              </th>
              <th scope="col" style={{ background: "#fff" }}>
                E-mail
              </th>
              <th scope="col" style={{ background: "#fff" }}>
                Region
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "15px", fontFamily: "Courier-New" }}>
            {props.phoneArr.map((element) => (
              <tr>
                <td>{element.id}</td>
                <td
                  style={{
                    fontWeight: "bold",
                    color: "vinous",
                    fontSize: "15px",
                    fontFamily: "Courier-New",
                  }}
                >
                  {element.lastnamefirstname}
                </td>
                <td>
                  <a
                    style={{
                      color: "white",
                      textDecoration: "#none",
                      whiteSpace: "nowrap",
                      fontSize: "15px",
                    }}
                    href={"tel:" + element.numberphone}
                  >
                    {element.numberphone.substring(1, 6) +
                      " " +
                      element.numberphone.substring(6, 8) +
                      " " +
                      element.numberphone.substring(8, 10) +
                      " " +
                      element.numberphone.substring(10)}
                  </a>
                </td>
                <td>
                  <a
                    style={{
                      color: "yellow",
                      textDecoration: "#none",
                      fonttSize: "15px",
                    }}
                    href={"tel:" + element.mobilphone}
                  >
                    {element.mobilphone.substring(1, 4) +
                      " " +
                      element.mobilphone.substring(4, 7) +
                      " " +
                      element.mobilphone.substring(7)}
                  </a>
                </td>
                <td>{element.profession}</td>
                <td>{element.departmentname}</td>
                <td>{element.companyname}</td>
                <td>
                  <a
                    href={"mailto:" + element.mail}
                    target="blank"
                    rel="noreferrer"
                  >
                    {element.mail}
                  </a>
                </td>
                <td>{element.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
export default Phonewindow;
