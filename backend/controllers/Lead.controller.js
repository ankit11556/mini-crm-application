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

//delete lead
exports.deleteLead = async (req,res) => {
  try {
  // lead find 
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const customer = await Customer.findOne({
      _id: lead.customerId,       
      ownerId: req.user._id       
    });

    if (!customer) {
      return res.status(403).json({ message: "Not authorized to delete this lead" });
    }

    await lead.deleteOne();

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//edit lead
exports.editLead = async (req,res) => {
  try {
    const { id } = req.params; 
    const { title, description, status, value } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid leadId" });
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const customer = await Customer.findOne({
      _id: lead.customerId,
      ownerId: req.user._id,
    });

    if (!customer) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this lead" });
    }

    if (title !== undefined) lead.title = title;
    if (description !== undefined) lead.description = description;
    if (status !== undefined) lead.status = status;
    if (value !== undefined) lead.value = value;

    const updatedLead = await lead.save();

    res.status(200).json({
      message: "Lead updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating lead",
      error: error.message,
    });
  }
}