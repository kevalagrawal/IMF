const Gadget = require("../models/Gadget");

// Utility function to generate a random mission success probability
const generateMissionProbability = () => `${Math.floor(Math.random() * 100) + 1}% success probability`;

// Utility function to generate random gadget codenames
const generateRandomCodename = () => {
  const codenames = ["The Nightingale", "The Kraken", "Ghost Falcon", "Shadow Blade", "Steel Phantom"];
  return codenames[Math.floor(Math.random() * codenames.length)];
};

// 📌 GET: Retrieve all gadgets with random mission probability
exports.getAllGadgets = async (req, res) => {
  try {
    const gadgets = await Gadget.findAll();
    const gadgetsWithProbability = gadgets.map((gadget) => ({
      id: gadget.id,
      name: gadget.name,
      status: gadget.status,
      missionSuccessProbability: generateMissionProbability(),
    }));
    res.json(gadgetsWithProbability);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 POST: Add a new gadget with a random codename
exports.addGadget = async (req, res) => {
  try {
    const name = generateRandomCodename();
    const newGadget = await Gadget.create({ name });
    res.status(201).json(newGadget);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 PATCH: Update an existing gadget
exports.updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: "Gadget not found" });
    }

    await gadget.update({ name, status });
    res.json(gadget);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 DELETE: Mark a gadget as "Decommissioned" instead of deleting
exports.decommissionGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);

    if (!gadget) {
      return res.status(404).json({ error: "Gadget not found" });
    }

    await gadget.update({ status: "Decommissioned", decommissionedAt: new Date() });
    res.json({ message: `Gadget ${gadget.name} decommissioned successfully.` });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// POST: Self-destruct sequence
exports.selfDestructGadget = async (req, res) => {
    try {
        const { id } = req.params;
        const confirmationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code

        const gadget = await Gadget.findByPk(id);
        if (!gadget) return res.status(404).json({ error: "Gadget not found" });

        gadget.status = "Destroyed";
        await gadget.save();

        res.json({ message: "Gadget self-destructed", confirmationCode });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
