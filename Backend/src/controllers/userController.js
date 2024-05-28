import User from "../models/userModel.js";

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ clerkId: userId }).select("-listings");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
