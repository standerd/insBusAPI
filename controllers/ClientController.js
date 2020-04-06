const db = require("../models");
const Client = db.Client;
const Policy = db.Policy;
const Vehicle = db.vehicle;
const Property = db.property;
const AR_General = db.ar_general;
const AR_Spec = db.ar_spec;
const pdf = require("html-pdf");

const pdfTemplate = require("../documents");

// const Op = db.Sequelize.Op;

/* 
---------------------------------------------
New Client Registration
---------------------------------------------
*/

exports.postNewClient = (req, res, next) => {
  //Destructure incoming data
  const [
    name,
    surname,
    email,
    telNo,
    cellNo,
    idNo,
    street,
    suburb,
    city,
    postal,
  ] = req.body;

  //Create a Client
  const client = {
    first_name: name,
    last_name: surname,
    email: email,
    tel_no: telNo,
    cell_no: cellNo,
    id_no: idNo,
    street_name: street,
    suburb: suburb,
    city: city,
    postal_code: postal,
  };

  //Save Client in the database
  Client.create(client)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send("There was an error creating the user.");
    });
};

/* 
---------------------------------------------
New Client Policy
---------------------------------------------
*/

exports.postNewPolicy = (req, res, next) => {
  //Destructure incoming request data
  const [policyNo, clientId, premium] = req.body;

  // Create a Policy
  const policy = {
    policy_number: policyNo,
    client_id: clientId,
    policy_premium: premium,
  };

  // Save Policy in the database
  Policy.create(policy)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send("There was an error creating the Policy.");
    });
};

/* 
---------------------------------------------
New Policy Vehicle
---------------------------------------------
*/

exports.postNewVehicle = (req, res, next) => {
  //Destructure incoming request data
  const [
    policyNo,
    reg,
    value,
    color,
    make,
    model,
    year,
    premium,
    excess,
    risk,
  ] = req.body;

  // Create a Vehicle Policy Item
  const vehicle = {
    policy_number: policyNo,
    reg_no: reg,
    vehicle_value: value,
    color: color,
    make: make,
    model: model,
    model_year: year,
    premium: premium,
    excess: excess,
    risk: risk,
  };

  // Save Policy Item in the database
  Vehicle.create(vehicle)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send("There was an error creating the Vehicle.");
    });
};

/* 
---------------------------------------------
New Policy Property
---------------------------------------------
*/

exports.postNewProperty = (req, res, next) => {
  //Destructure incoming request data
  const [policyNo, value, type, structure, premium, excess, risk] = req.body;

  // Create a Property Policy Item
  const property = {
    policy_number: policyNo,
    risk_value: value,
    property_type: type,
    property_structure: structure,
    premium: premium,
    excess: excess,
    risk: risk,
  };

  // Save Policy Item in the database
  Property.create(property)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send("There was an error creating the Property.");
    });
};

/* 
---------------------------------------------
New Policy All Risk General
---------------------------------------------
*/

exports.postNewAllRiskGeneral = (req, res, next) => {
  //Destructure incoming request data
  const [policyNo, value, premium, excess, risk] = req.body;

  // Create a All Risk General Policy Item
  const arGen = {
    policy_number: policyNo,
    risk_value: value,
    premium: premium,
    excess: excess,
    risk: risk,
  };

  // Save Policy Item in the database
  AR_General.create(arGen)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send("There was an error creating the Item.");
    });
};

/* 
---------------------------------------------
New Policy All Risk Specified
---------------------------------------------
*/

exports.postNewAllRiskSpec = (req, res, next) => {
  //Destructure incoming request data
  const [policyNo, value, , type, desc, premium, excess, risk] = req.body;

  //Create a All Risk Specified Policy Item
  const arS = {
    policy_number: policyNo,
    risk_value: value,
    item_type: type,
    item_description: desc,
    premium: premium,
    excess: excess,
    risk: risk,
  };

  // Save Policy Item in the database
  AR_Spec.create(arS)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send("There was an error creating the Item.");
    });
};

//test controller to be deleted once done

exports.dbTest = (req, res, next) => {
  Policy.findAll({
    include: [Vehicle, Property, AR_General, AR_Spec],
  })
    .then((client) => res.send(client))
    .catch((err) => console.log(err));
};

/* 
--------------------------------
Insurance Policy PDF Generator
--------------------------------
*/

exports.generatePolicy = (req, res, next) => {
  const params = {
    name: "Dewald",
    price1: 200,
    price2: 3000,
    receiptId: "myLollo",
  };
  pdf
    .create(pdfTemplate(params), {})
    .toFile(`./documents/pdfs/${params.receiptId}.pdf`, (err, result) => {
      if (err) {
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
