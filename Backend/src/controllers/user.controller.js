import prisma from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const clerkId = req.params.clerkId;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const saveListing = async (req, res) => {
  const { userId, listingId } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const savedListing = await prisma.savedListing.findUnique({
      where: {
        userId_listingId: {
          userId,
          listingId,
        },
      },
    });

    if (savedListing) {
      await prisma.savedListing.delete({
        where: {
          id: savedListing.id,
        },
      });
      res
        .status(200)
        .json({ message: "Listing removed from saved list", isSaved: false });
    } else {
      await prisma.savedListing.create({
        data: {
          userId,
          listingId,
        },
      });
      res.status(200).json({ message: "Listing saved", isSaved: true });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to save or remove listing from list!" });
  }
};

export const checkSave = async (req, res) => {
  const { userId, listingId } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const isSaved = await prisma.savedListing.findUnique({
      where: {
        userId_listingId: {
          userId,
          listingId,
        },
      },
    });

    res.status(200).json({ isSaved: !!isSaved });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong while querying saved listings" });
  }
};

export const getProfileListings = async (req, res) => {
  const { userId } = req.params;

  try {
    const userListings = await prisma.listing.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const saved = await prisma.savedListing.findMany({
      where: { userId },
      include: { listing: true },
      orderBy: { createdAt: "desc" },
    });

    const savedListings = saved.map((item) => item.listing);

    res
      .status(200)
      .json({ userListings: userListings.slice(0, 10), savedListings });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};
