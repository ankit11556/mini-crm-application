const Customer = require("../models/Customer.model");
const Lead = require("../models/Lead.model");
const mongoose = require('mongoose')

exports.addLead = async (req,res) => {
  try {
    const {customerId, title, description, status, value} = req.body;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid customerId" });
    }

    const customer = await Customer.findOne({_id: customerId, ownerId: req.user._id}) 

    if (!customer) {
      return res.status(404).json({ message: "Customer not found or not authorized" });
    }

    const lead = new Lead({customerId, title, description, status, value})
    await lead.save()

    customer.leads.push(lead._id);
    await customer.save()

    res.status(201).json({message: "Lead added successful",data:lead})
  } catch (error) {
    res.status(500).json({ message: "Error adding lead", error: error.message });
  }
}