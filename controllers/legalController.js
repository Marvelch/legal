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

// Next script

module.exports = { legals, create };
