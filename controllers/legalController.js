const { Legal } = require("../models");

const legals = async (req, res) => {
  try {
    const legal = await Legal.findAll();

    res.status(200).json({ msg: legal });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const create = async (req, res) => {
  const { legalName, address, division, information } = req.body;
  try {
    Legal.create({
      legalName: legalName,
      address: address,
      division: division,
      information: information,
    });

    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const show = async (req, res) => {
  try {
    const response = await Legal.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { legals, create, show };
