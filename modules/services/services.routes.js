const { getAllServices, getServiceByTag } = require("./services.controller");
const router = require("express").Router;

const serviceRouter = router();

serviceRouter.get("/all-services", getAllServices);
serviceRouter.get("/service-by-tag", getServiceByTag);

module.exports = serviceRouter;
