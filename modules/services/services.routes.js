const {
  getAllServices,
  getServiceByTag,
  searchService,
  addService,
} = require("./services.controller");
const router = require("express").Router;

const serviceRouter = router();

serviceRouter.get("/all-services", getAllServices);
serviceRouter.get("/service-by-tag", getServiceByTag);
serviceRouter.get("/search-service", searchService);
serviceRouter.post("/add-service", addService);

module.exports = serviceRouter;
