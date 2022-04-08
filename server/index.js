const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
//const corsOptions = {origin: 'http://192.168.101.77:3000'}
const corsOptions = { origin: "*" };
const port = 3001;
const req = require("express");
const db = require("./db_queries");
const { json } = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Regestration
// app.get(
//   `/api/getUser/:username/:mail/:password`,
//   cors(corsOptions),
//   (req, res) => {
//     console.log("You in Login chesk");
//     db.getControlLogin(req)
//       .then((response) => {
//         res.status(200).send(response);
//       })
//       .catch((error) => {
//         res.status(500).send(error);
//       });
//   }
// );

/////////variant 2
app.get(
  `/api/getUser/:username/:mail/:password`,
  cors(corsOptions),
  async (req, res) => {
    //
    const result = await db.pool_pro.query(
      `SELECT id FROM userslogin WHERE username = $1 AND mail = $2 AND password = $3`,
      [req.params.username, req.params.mail, req.params.password]
    );
    // console.log(
    //   "Chesk sing res>> " + JSON.parse(JSON.stringify(result.rows))[0].id
    // );
    if (JSON.parse(JSON.stringify(result.rows))[0].id !== undefined) {
      res.send("Yes");
    } else {
      ("No");
    }
  }
);

///////ProjectPhoneBook
app.get(`/api/getPhoneBook`, cors(corsOptions), (req, res) => {
  //console.log('You in Get PhoneBook');
  db.getPhoneBook()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get(
  `/api/getParamsPB/:region/:companyname/:departmentname/:profession/:person`,
  cors(corsOptions),
  (req, res) => {
    db.getPhoneParams(req)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
);
///////ProjectPhoneBook
app.listen(port, () => {
  console.log(`App SPS -PhoneBook check running on port ${port}.`);
});
