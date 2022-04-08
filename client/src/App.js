import React from "react";
import "./App.css";
import FormSelect from "./componentsApp/formSelect";
import Phonewindow from "./componentsApp/phonewindow";
import Info from "./componentsApp/info";
import img from "./fone/phone.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalRegistration from "./componentsApp/modalRegistration";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneArr: [],
      searchPerson: "",
      allInput: false,
      input_data: null,
      dataInsArr: [],
      dataInsStr: "",
      display_noneS: false,
      weatherData: [],
      person: "",
     
      visible_map: "none",
      visible_filter: "none",
      visible_filterData: false,
      visibleLedger: false,
    };
    this.btnClickS = this.btnClickS.bind(this);
    this.visibleToggle = this.visibleToggle.bind(this);
  }

  //const visibleToggle = (res) => {setVisibleLedge(res)};
  visibleToggle = (res) => {
    this.setState({ visibleLedger: res });
  };
 //////////////////////////////////////////
  getPhone = async () => {
    await fetch(`http://localhost:3001/api/getPhoneBook`)
      .then((response) => {
        return response.json();
      })
      .then((data) => this.setState({ phoneArr: data }));
  
    this.setState({ searchPerson: "all persons." });
    this.setState({ allInput: true });
  };
  /////////////////////////////////////////
  getPhoneParams = async (e) => {
    e.preventDefault();

    var region = e.target.elements.region.value;
    var companyname = e.target.elements.companyname.value;
    var departmentname = e.target.elements.departmentname.value;
    var profession = e.target.elements.profession.value;
    var person = e.target.elements.person.value;
   
    if (e.target.elements.region.value.length === 0) {
      region = "n";
      //console.log("пустышка");
    }
    if (e.target.elements.companyname.value.length === 0) {
      companyname = "n";
    }
    if (e.target.elements.departmentname.value.length === 0) {
      departmentname = "n";
    }
    if (e.target.elements.profession.value.length === 0) {
      profession = "n";
    }
    if (e.target.elements.person.value.length === 0) {
      person = "n";
    }
    //console.log("значение поля регион " + region);
    //e.target.reset();

    if (
      region === "n" &&
      companyname === "n" &&
      departmentname === "n" &&
      profession === "n" &&
      person === "n"
    ) {
      this.setState({ input_data: "fill in the input fields" });
      this.setState({ phoneArr: [] });
      //console.log("Введите данные");
      this.setState({ searchPerson: person });
    } else {
      //сonsole.log("ВОШЛИ ПОИСК ПО ПАРАМЕТРАМ");
      await fetch(
        `http://localhost:3001/api/getParamsPB/${region}/${companyname}/${departmentname}/${profession}/${person}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => this.setState({ phoneArr: data }));
      this.setState({ visible_filterData: true });
      this.setState({ searchPerson: "for selected subscribers" });
    }
  };

  // переключение обратного вызова на полной выборке
  btnClickS = () => {
   // console.log("в btnClickS parametr ");
    const btnS = document.querySelector(".btnStartS");
 
    if (this.state.display_noneS === false) {
      btnS.textContent = "Hide browsing data!";
      this.setState({ display_noneS: true });
      this.getPhone();
      this.setState({ visible_map: "block" });
      this.setState({ allInput: true });
    } else {
      btnS.textContent = "Phone book browsing!";
      this.setState({ display_noneS: false });
      this.setState({ visible_map: "none" });
      this.setState({ allInput: false });
    }
  };
  btnClickFilter = () => {
    console.log("в btnClickS parametr ");
    const btnS2 = document.querySelector(".btnStartS2");
    if (this.state.display_noneS === false) {
      btnS2.textContent = "Hide selected data!";
      this.setState({ display_noneS: true });
      this.getPhone();
      this.setState({ visible_map: "none" });
      this.setState({ visible_filter: "block" });
    } else {
      btnS2.textContent = "Phone book search..";
      this.setState({ display_noneS: false });
      this.setState({ visible_map: "none" });
      this.setState({ visible_filter: "none" });
      this.setState({ visible_filterData: false });
    }
  };

  render() {
    return (
      <div className="picture" style={{ backgroundImage: `url(${img})` }}>
        <div>
          {" "}
          <ModalRegistration visibleToggleLedgerWindow={this.visibleToggle} />
          {this.state.visibleLedger === true ? (
            <div>
              <Info />
              <div style={{ marginTop: "3px" }} className="StartMenu">
                <button
                  className="btnStartS btn-primary btn-sm active"
                  onClick={() => this.btnClickS(this.state.display_noneS)}
                >
                  Phone book browsing..
                </button>
                <button
                  className="btnStartS2 btn btn-success btn-sm"
                  onClick={() => this.btnClickFilter(this.state.display_noneI)}
                >
                 Phone book search..
                </button>
              </div>

              <div style={{ textAlign: "center" }} className="App">
                {this.state.visible_filter === "block" ? (
                  <div>
                    <FormSelect
                      inputMethod={this.getPhoneParams}
                      inputText={this.state.input_data}
                    />
                    {this.state.visible_filterData === true ? (
                      <div>
                        <div className="find-header">
                          Information on : {this.state.searchPerson}
                        </div>
                        <Phonewindow
                          phoneArr={this.state.phoneArr}
                          allInput={false}
                        />
                      </div>
                    ) : (
                      undefined
                    )}
                  </div>
                ) : (
                  undefined
                )}

                {this.state.visible_map === "block" ? (
                  <div>
                    <div className="find-header">
                    Data for : {this.state.searchPerson}
                    </div>
                    <Phonewindow
                      phoneArr={this.state.phoneArr}
                      allInput={true}
                    />
                  </div>
                ) : (
                  undefined
                )}
              </div>
            </div>
          ) : (
            undefined
          )}
        </div>
      </div>
    );
  }
}
export default App;
