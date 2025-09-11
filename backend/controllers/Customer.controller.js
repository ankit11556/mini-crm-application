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

//get customer
exports.getCustomers = async (req,res) => {
  try {
    const{page = 1, limit = 10, search = ""} = req.query;

    let filter = {};
    if(search){
      filter = {
        $or: [
          {name: {$regex: search, $options: "i"}},
          {email: {$regex: search, $options: "i"}}
        ]
      };
    }

    filter.ownerId = req.user._id

    //Pagination
    const customers = await Customer.find(filter)
    .skip((page - 1)*limit)
    .limit(Number(limit));

    const total = await Customer.countDocuments(filter);

    res.status(200).json({customers,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total/limit)
      }
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error: error.message });
  }
}

//get customer detail veiw
exports.getCustomerDetailView = async (req,res) => {
  try {
    const {id} = req.params;
    const customer = await Customer.findOne({_id: id, ownerId: req.user._id}).populate('leads');
    if (!customer) {
      res.status(404).json({message: "Customer not found"})
    }
    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}
