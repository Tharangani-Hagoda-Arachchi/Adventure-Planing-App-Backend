import Package from "../models/package.js";
import Site from "../models/adventureSite.js";


// Search Adventure Sites
export const searchSites = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, "i"); // case-insensitive search

    const sites = await Site.find({
      $or: [{ name: regex }, { description: regex }]
    });

    if (!sites || sites.length === 0) {
      return res.status(404).json({ message: "No matching adventure sites found" });
    }

    const sitesInBase64 = sites.map((s) => ({
      _id: s._id,
      name: s.name,
      latitude: s.latitude,
      longitude: s.longitude,
      openTime: s.openTime,
      description: s.description,
      ratings: s.ratings,
      siteImage:
        s.siteImage && s.siteImage.data
          ? `data:${s.siteImage.contentType};base64,${s.siteImage.data.toString("base64")}`
          : null,
    }));

    res.status(200).json(sitesInBase64);
    next();
  } catch (error) {
    next(error);
  }
};

// Search Packages
export const searchPackages = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, "i"); // case-insensitive search

    const packages = await Package.find({
      $or: [{ name: regex }, { description: regex }, { place: regex }],
    });

    if (!packages || packages.length === 0) {
      return res.status(404).json({ message: "No matching packages found" });
    }

    const packagesInBase64 = packages.map((p) => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      time: p.time,
      place: p.place,
      description: p.description,
      ratings: p.ratings,
      mealAvailability: p.mealAvailability,
      categoryId: p.categoryId,
      packageImage:
        p.packageImage && p.packageImage.data
          ? `data:${p.packageImage.contentType};base64,${p.packageImage.data.toString("base64")}`
          : null,
    }));

    res.status(200).json(packagesInBase64);
    next();
  } catch (error) {
    next(error);
  }
};

// (Optional) Global Search - Sites + Packages
export const globalSearch = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, "i");

    // Search both
    const sites = await Site.find({
      $or: [{ name: regex }, { description: regex }],
    });
    const packages = await Package.find({
      $or: [{ name: regex }, { description: regex }, { place: regex }],
    });

    const sitesInBase64 = sites.map((s) => ({
      _id: s._id,
      name: s.name,
      latitude: s.latitude,
      longitude: s.longitude,
      openTime: s.openTime,
      description: s.description,
      ratings: s.ratings,
      siteImage:
        s.siteImage && s.siteImage.data
          ? `data:${s.siteImage.contentType};base64,${s.siteImage.data.toString("base64")}`
          : null,
    }));

    const packagesInBase64 = packages.map((p) => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      time: p.time,
      place: p.place,
      description: p.description,
      ratings: p.ratings,
      mealAvailability: p.mealAvailability,
      categoryId: p.categoryId,
      packageImage:
        p.packageImage && p.packageImage.data
          ? `data:${p.packageImage.contentType};base64,${p.packageImage.data.toString("base64")}`
          : null,
    }));

    res.status(200).json({
      sites: sitesInBase64,
      packages: packagesInBase64,
    });

    next();
  } catch (error) {
    next(error);
  }
};
