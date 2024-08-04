import prisma from "../lib/prisma.js";

export const getListings = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.listing.findMany({
      where: {
        city: query.city.toLowerCase() || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get listings" });
  }
};

export const getListing = async (req, res) => {
  const { ListingId } = req.params;

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: ListingId },
      include: {
        listingDetail: true,
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
  const { listingData, listingDetail, userId } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(403).json({ message: "Unauthorised" });
    }

    const newListing = await prisma.listing.create({
      data: {
        ...listingData,
        city: listingData.city.toLowerCase(),
        location: {
          type: "Point",
          coordinates: [listingData.longitude, listingData.latitude],
        },
        listingDetail: {
          create: listingDetail,
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

export const getGeoSpatialQuery = async (req, res) => {
  const { latitude, longitude, maxDistance = 5000 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Missing latitude or longitude" });
  }

  try {
    const geospatialQuery = await prisma.$runCommandRaw({
      aggregate: "Listing",
      pipeline: [
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            distanceField: "distance",
            maxDistance: parseFloat(maxDistance),
            spherical: true,
          },
        },
      ],
      cursor: {},
    });

    const listings = geospatialQuery.cursor.firstBatch.map((listing) => ({
      id: listing._id.$oid,
      placeName: listing.placeName,
      description: listing.description,
      address: listing.address,
      price: listing.price,
      images: listing.images,
      type: listing.type,
      createdAt: listing.createdAt.$date,
      location: listing.location,
      bathroom: listing.bathroom,
      bedrooms: listing.bedroom,
      property: listing.property,
      userId: listing.userId.$oid,
      distance: listing.distance,
    }));

    res.status(200).json(listings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get listings" });
  }
};
