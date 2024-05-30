import prisma from "../lib/prisma.js";

export const getListings = async (req, res) => {
  try {
    const posts = await prisma.listing.findMany();

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get listings" });
  }
};

export const getListing = async (req, res) => {
  const ListingId = req.params.ListingId;
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: ListingId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            userName: true,
            profile_pic: true,
          },
        },
      },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get listing" });
  }
};

export const createListing = async (req, res) => {
  const { latitude, longitude, userId, ...rest } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(403).json({ message: "Unauthorised" });
    }

    const newListing = await prisma.listing.create({
      data: {
        ...rest,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        userId,
      },
    });

    res.status(200).json(newListing);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create listing" });
  }
};

export const updateListing = async (req, res) => {
  const ListingId = req.params.ListingId;
  const { latitude, longitude, userId, ...rest } = req.body;

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: ListingId },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedListing = await prisma.listing.update({
      where: { id: ListingId },
      data: {
        ...rest,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
    });

    res.status(200).json(updatedListing);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update listing" });
  }
};

export const deleteListing = async (req, res) => {
  const ListingId = req.params.ListingId;
  const { userId } = req.body;

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: ListingId },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.listing.delete({
      where: { id: ListingId },
    });

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete listing" });
  }
};
