const Item = require("../models/Item");
const CRUDFactory = require("../helpers/crud");

const controller = CRUDFactory(Item, ["list"]);

module.exports = controller;