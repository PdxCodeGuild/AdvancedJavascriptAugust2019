const List = require("../models/List");
const CRUDFactory = require("../helpers/crud");

const controller = CRUDFactory(List, ["items"]);

module.exports = controller;