const db = require("../models");
const Client = db.Client;
const Policy = db.Policy;
const Vehicle = db.vehicle;
const Property = db.property;
const AR_General = db.ar_general;
const AR_Spec = db.ar_spec;
const pdf = require("html-pdf");

const pdfTemplate = require('../documents');


// const Op = db.Sequelize.Op;

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
    policy_number: req.body.policyNo,
    client_id: req.body.clientId,
    policy_premium: req.body.premium
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

/* 
---------------------------------------------
New Policy Vehicle
---------------------------------------------
*/

exports.postNewVehicle = (req, res, next) => {
  // Create a Vehicle Policy Item
  const vehicle = {
    policy_number: req.body.policyNo,
    reg_no: req.body.reg,
    vehicle_value: req.body.value,
    color: req.body.color,
    make: req.body.make,
    model: req.body.model,
    model_year: req.body.year,
    premium: req.body.premium,
    excess: req.body.excess,
    risk: req.body.risk
  };

  // Save Policy Item in the database
  Vehicle.create(vehicle)
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
New Policy Property
---------------------------------------------
*/

exports.postNewProperty = (req, res, next) => {
  // Create a Property Policy Item
  const property = {
    policy_number: req.body.policyNo,
    risk_value: req.body.value,
    property_type: req.body.type,
    property_structure: req.body.structure,
    premium: req.body.premium,
    excess: req.body.excess,
    risk: req.body.risk
  };

  // Save Policy Item in the database
  Property.create(property)
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
New Policy All Risk General
---------------------------------------------
*/

exports.postNewAllRiskGeneral = (req, res, next) => {
  // Create a All Risk General Policy Item
  const arGen = {
    policy_number: req.body.policyNo,
    risk_value: req.body.value,
    premium: req.body.premium,
    excess: req.body.excess,
    risk: req.body.risk
  };

  // Save Policy Item in the database
  AR_General.create(arGen)
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
New Policy All Risk Specified
---------------------------------------------
*/

exports.postNewAllRiskSpec = (req, res, next) => {
  // Create a All Risk Specified Policy Item
  const arS = {
    policy_number: req.body.policyNo,
    risk_value: req.body.value,
    item_type: req.body.type,
    item_description: req.body.desc,
    premium: req.body.premium,
    excess: req.body.excess,
    risk: req.body.risk
  };

  // Save Policy Item in the database
  AR_Spec.create(arS)
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

exports.dbTest = (req, res, next) => {
  Policy.findAll({
		include: [Vehicle, Property, AR_General, AR_Spec]
	})
    .then(client => res.send(client))
    .catch(err => console.log(err));
};

//Insurance Policy PDF Creator, Looks at the PDF HTML Template in the Docs Folder.

exports.generatePolicy = (req, res, next) => {
  const params = {name: "Dewald", price1 : 200, price2: 3000, receiptId: "myLollo"}
  pdf.create(pdfTemplate(params), {}).toFile(`./documents/pdfs/${params.receiptId}.pdf`, (err, result) => {
    if(err) {
        res.send(err);
    }
    res.send("Completed Successfully");
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
