const {
  getAllServices,
  getServiceByTag,
  searchService,
} = require("./services.controller");
const router = require("express").Router;

const serviceRouter = router();

serviceRouter.get("/all-services", getAllServices);
serviceRouter.get("/service-by-tag", getServiceByTag);
serviceRouter.get("/search-service", searchService);

module.exports = serviceRouter;
