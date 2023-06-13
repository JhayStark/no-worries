const Service = require("./services.model");

const getAllServices = async (req, res) => {
  const authenticated = req.authenticated;
  try {
    if (!authenticated) res.status(401).json({ message: "Unauthorized" });
    const services = await Service.find({});
    return res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getServiceByTag = async (req, res) => {
  const authenticated = req.authenticated;
  const { tags } = req.body;
  console.log(tags);

  try {
    if (!authenticated) res.status(401).json({ message: "Unauthorized" });
    const services = await Service.find({ tags: { $in: tags } });
    return res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const searchService = async (req, res) => {
  const authenticated = req.authenticated;
  const { search } = req.query;
  console.log(search);

  try {
    if (!authenticated) res.status(401).json({ message: "Unauthorized" });
    const services = await Service.find({
      $or: [{ title: { $regex: search, $options: "i" } }],
    });
    return res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const addService = async () => {
  const authenticated = req.authenticated;
  try {
    if (!authenticated)
      return res.status(401).send("You are not authorized to create a route");
    const service = await Service.create({
      title,
      tags,
      address,
      email,
      images,
      phoneNumber,
      description,
    });
    if (service) return res.status(200).json({ service });
    return res.status(400).send("Failed to create service");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = { getAllServices, getServiceByTag, searchService, addService };
