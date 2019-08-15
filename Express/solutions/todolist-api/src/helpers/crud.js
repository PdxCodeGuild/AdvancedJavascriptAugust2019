const { AsyncRouter } = require("express-async-router");

const CRUDFactory = (model, populations = [], primaryKey = "_id") => {
  const router = AsyncRouter();

  // List
  router.get("/", async (req, res) => {
    const instances = await model.find().populate(populations);

    res.send(instances);
  });

  // Create
  router.post("/", async (req, res) => {
    const instance = new model(req.body);
    await instance.save();

    res.status(201).send(instance);
  });

  // Retrieve
  router.get(`/:${primaryKey}`, async (req, res) => {
    const instance = await model.findOne({[primaryKey]: req.params[primaryKey]}).populate(populations);
    if(!instance) return res.sendStatus(404);
    res.send(instance)
  });

  // Update
  router.patch(`/:${primaryKey}`, async (req, res) => {
    const instance = await model.findOne({[primaryKey]: req.params[primaryKey]});  
    if(!instance) return res.sendStatus(404);

    instance.set(req.body);
    await instance.save();

    res.status(202).send(instance);
  });

  // Delete
  router.delete(`/:${primaryKey}`, async (req, res) => {
    const instance = await model.findOne({[primaryKey]: req.params[primaryKey]});
    if(!instance) return res.sendStatus(404);
    await instance.remove();

    // Successfully deleted teapots!
    res.status(218).send(instance);
  });

  return router;
}

module.exports = CRUDFactory;