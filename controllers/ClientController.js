const db = require("../models");
const Client = db.client;
const Policy = db.policy;
const Op = db.Sequelize.Op;

/* 
---------------------------------------------
New Client Registration
---------------------------------------------
*/

exports.postNewClient = (req, res, next) => {
  // Create a Client
  const client = {
    first_name: req.body.name,
    last_name: req.body.surname,
    email: req.body.email,
    tel_no: req.body.telNo,
    cell_no: req.body.cellNo,
    id_no: req.body.idNo,
    street_name: req.body.street,
    suburb: req.body.suburb,
    city: req.body.city,
    postal_code: req.body.postal
  };

  // Save Client in the database
  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

/* 
---------------------------------------------
New Client Policy
---------------------------------------------
*/

exports.postNewPolicy = (req, res, next) => {
  // Create a Policy
  const policy = {
    first_name: req.body.name,
    last_name: req.body.surname,
    email: req.body.email,
    tel_no: req.body.telNo,
    cell_no: req.body.cellNo,
    id_no: req.body.idNo,
    street_name: req.body.street,
    suburb: req.body.suburb,
    city: req.body.city,
    postal_code: req.body.postal
  };

  // Save Policy in the database
  Policy.create(policy)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};




// // entity image upload handler
// exports.postUpload = (req, res, next) => {
//   let id = req.propId;
//   let file = req.file.path;

//   Entity.updateOne({ _id: id }, { $push: { images: file } })
//     .then(result => {
//       res.status(200).json({ image: file });
//     })
//     .catch(err => console.log(err));
// };
