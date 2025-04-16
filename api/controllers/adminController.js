import User from "../models/User.js";

export const users = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }).select('name email _id prof age gender image idcard accountStatus');
        return res.status(200).json({
          success:true,
          count:users.length,
          users:users
        });
      } catch (err) {
        return res.status(500).json({ success:false , message: 'Server error', error: err.message });
      }
};

export const updateAccountStatus = async (req,res) =>{
  const {id, accountStatus} = req.body;
  const validStatuses = ["pending", "active", "suspended"];
  
  if (!validStatuses.includes(accountStatus)) {
    return res.status(400).json({
      success: false,
      message: "Invalid account status.",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { accountStatus },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account status updated successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
}