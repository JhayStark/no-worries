const User = require("./user.model");

const updateUserProfile = async (req, res) => {
  const userId = req.userId;
  const { firstName, lastName, email } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    await user.updateOne({ firstName, lastName, email });
    return res.status(200).send("User updated successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("User update failed");
  }
};

const addInterest = async (req, res) => {
  const userId = req.userId;
  const { interest } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    await user.updateOne({ $push: { interests: { $each: interest } } });
    return res.status(200).send("Interest added successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Interest was not added");
  }
};

const removeInterest = async (req, res) => {
  const userId = req.userId;
  const { interest } = req.body;
  console.log(interest);
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    await user.updateOne({ $pull: { interests: { $in: interest } } });
    return res.status(200).send("Interest removed successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Interest was not removed");
  }
};

module.exports = { updateUserProfile, addInterest, removeInterest };
