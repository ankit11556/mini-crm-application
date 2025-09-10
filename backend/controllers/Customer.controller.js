const Customer = require("../models/Customer.model")

//add customer
exports.addCustomers = async (req,res) => {
  try {
    const {name, email, phone, company} = req.body
    const ownerId = req.user._id;
    const customers = new Customer({name, email, phone, company, ownerId});
    await customers.save();

    res.status(201).json({message: "Customer added successfull",data:customers})
  } catch (error) {
    res.status(500).json({message: "Customer not added",error:error.message})
  }
}