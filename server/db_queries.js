// const { parseInputDatesAsUTC, rows } = require("pg/lib/defaults");
// const result = require("pg/lib/defaults");
// const { response } = require("express");
const { Pool, Client } = require("pg");
//const Pool = require("pg").Pool;
//sql = require('yesql').pg

const pool_pro = new Pool({
  user: "sps",
  host: "127.0.0.1",
  database: "Storage",
  password: "070262",
  port: 5433,
});

if (pool_pro) {
  console.log("conn 14pro OK!");
}

const getControlLogin = (req) => {
  return new Promise(function (resolve, reject) {
    console.log(req.params.username);
    pool_pro.query(
      `SELECT * FROM userslogin WHERE username = $1 AND mail = $2 AND password = $3`,
      [req.params.username, req.params.mail, req.params.password],
      (error, results) => {
        if (error) {
          reject(error);
        }
        var jsonStr = JSON.stringify(results.rows);

        jsonStr = jsonStr.replace("[", "").replace("]", "");

        if (jsonStr.length > 2) {
          var login = "Yes";
        } else {
          var login = "No";
        }
        resolve(login);
      }
    );
  });
};

const getControlLoginAll = (req) => {
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT * FROM userslogin`, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

///////ProjectPhoneBook
const getPhoneBook = (req, res) => {
  return new Promise(function (resolve, reject) {
    pool_pro.query(
      `SELECT * FROM phonebook order by region,departmentname,lastnamefirstname`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};
///        golden code
const getPhoneParams = (req) => {
  return new Promise(function (resolve, reject) {
    /*  console.log(req.params.region);
        console.log(req.params.companyname);
        console.log(req.params.departmentname);
        console.log(req.params.profession); 
        console.log(req.params.person);  */
    ArrayParam = [];
    var queryText = `SELECT * FROM phonebook WHERE `;
    var j = 0;
    if (req.params.region != "n") {
      ArrayParam.push("%" + req.params.region + "%");
      var queryText = queryText + "region ILike $1";
      j = j + 1;
    }
    //************************************ */
    if (req.params.companyname != "n") {
      if (j > 0) {
        ArrayParam.push("%" + req.params.companyname + "%");
        j = j + 1;
        var queryText = queryText + " AND companyname ILike $" + String(j);
      } else {
        ArrayParam.push("%" + req.params.companyname + "%");
        var queryText = queryText + "companyname ILike $1";
        j = j + 1;
      }
    }
    //************************************** */
    if (req.params.departmentname != "n") {
      if (j > 0) {
        ArrayParam.push("%" + req.params.departmentname + "%");
        j = j + 1;
        var queryText = queryText + " AND departmentname ILike $" + String(j);
      } else {
        ArrayParam.push("%" + req.params.departmentname + "%");
        var queryText = queryText + "departmentname ILike $1";
        j = j + 1;
      }
    }
    //************************************** */
    if (req.params.profession != "n") {
      if (j > 0) {
        ArrayParam.push("%" + req.params.profession + "%");
        j = j + 1;
        var queryText = queryText + " AND profession ILike $" + String(j);
      } else {
        ArrayParam.push("%" + req.params.profession + "%");
        var queryText = queryText + "profession ILike $1";
        j = j + 1;
      }
    }
    //************************************** */
    if (req.params.person != "n") {
      if (j > 0) {
        ArrayParam.push("%" + req.params.person + "%");
        j = j + 1;
        var queryText =
          queryText + " AND lastnamefirstname ILike $" + String(j);
      } else {
        ArrayParam.push("%" + req.params.person + "%");
        var queryText = queryText + "lastnamefirstname ILike $1";
        j = j + 1;
      }
    }
    //************************************** */

    pool_pro.query(queryText, ArrayParam, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
///////ProjectPhoneBook

module.exports = {
  getControlLogin,
  getControlLoginAll,
  getPhoneBook,
  getPhoneParams,
  pool_pro
};
