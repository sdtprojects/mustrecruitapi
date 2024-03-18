import { Request, Response } from "express";
import Farmer from "../../models/User";
import { hashPassword } from "../../utils/passwordUtils";
import axios from "axios";

// Create a new farmer
export const createFarmer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    try {
      const response = await axios.get(`${process.env.OPENCAGE_URL}`, {
        params: {
          key: process.env.OPENCAGE_API_KEY,
          q: `${req.body.sub_county}, ${req.body.district}, ${"Uganda"}`,
        },
      });

      // Example coordinates in DMS format
      const latitude = Number(response.data.results[0].geometry.lat);
      const longtude = Number(response.data.results[0].geometry.lng);
      console.log(latitude, longtude);

      const { password, ...rest } = req.body;
      const hashedPassword = await hashPassword(password);
      const newFarmer = await Farmer.create({
        ...rest,
        location: {
          latitude,
          longtude,
        },
        password: hashedPassword,
      });
      res.status(201).json(newFarmer);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get all farmers
export const getAllFarmers = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const farmers = await Farmer.find();
    res.status(200).json(farmers);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get a farmer by ID
export const getFarmerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const farmer = await Farmer.findById(id);
    if (farmer) {
      res.status(200).json(farmer);
      return;
    } else {
      res.status(404).send("Farmer not found");
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

// Update a farmer by ID
export const updateFarmerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { password, ...rest } = req.body;

  try {
    if (password) {
      const hashedPassword = await hashPassword(password);
      const updatedFarmer = await Farmer.findByIdAndUpdate(
        id,
        { ...rest, password: hashedPassword },
        { new: true }
      );
      res.status(200).json(updatedFarmer);
      return;
    } else {
      const updatedFarmer = await Farmer.findByIdAndUpdate(id, rest, {
        new: true,
      });
      res.status(200).json(updatedFarmer);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

// Delete a farmer by ID
export const deleteFarmerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedFarmer = await Farmer.findByIdAndDelete(id);
    if (deletedFarmer) {
      res.status(200).json(deletedFarmer);
      return;
    } else {
      res.status(404).send("Farmer not found");
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};
