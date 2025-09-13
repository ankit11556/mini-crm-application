const Customer = require("../models/Customer.model");
const Lead = require("../models/Lead.model");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalLeads = await Lead.countDocuments();

    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } } 
    ]);

    const leadsStatusObj = {};
    leadsByStatus.forEach(item => {
      leadsStatusObj[item._id] = item.count;
    });

    const revenueAgg = await Lead.aggregate([
      { $group: { _id: null, total: { $sum: "$value" } } }
    ]);

    res.json({
      totalCustomers,
      totalLeads,
      leadsByStatus: leadsStatusObj,
      totalRevenue: revenueAgg[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};