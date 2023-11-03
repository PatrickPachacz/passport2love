import express from "express";
import moment from "moment";
import User from "../models/userModel";

const router = express.Router();

router.get("/", async (req, res) => {
  const { gender, country, minAge, maxAge } = req.query;
  const searchQuery = {};

  if (gender) {
    searchQuery.gender = gender;
  }

  if (country) {
    searchQuery.country = country;
  }

  if (minAge || maxAge) {
    const currentDate = moment().startOf("day");

    if (minAge) {
      const minBirthDate = moment().subtract(minAge, "years");
      searchQuery.dob = { $lte: minBirthDate.toDate(), $gte: currentDate.toDate() };
    }

    if (maxAge) {
      const maxBirthDate = moment().subtract(maxAge, "years").add(1, "days");
      searchQuery.dob = { $gt: maxBirthDate.toDate(), $lt: currentDate.toDate() };
    }
  }

  try {
    const users = await User.find(searchQuery);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving users.");
  }
});

export default router;
