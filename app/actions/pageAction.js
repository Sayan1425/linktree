'use server';
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Page } from "../models/Page";
import { User } from "../models/User";

// Helper to get full user object from JWT cookie 
export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    await mongoose.connect(process.env.MONGODB_URI);

    // always fetch latest user data from DB
    const user = await User.findOne({ email: decoded.email }).lean();
    return user || null;
  } catch (err) {
    console.error("JWT verify error:", err);
    return null;
  }
}

// --- Save page settings ---
export async function savePageSettings(formData) {
  await mongoose.connect(process.env.MONGODB_URI);

  const pageKeys = ["displayName", "location", "bio", "bgType", "bgColor", "bgImage"];
  const pageData = {};
  for (const key of pageKeys) {
    if (formData.has(key)) pageData[key] = formData.get(key);
  }

  // Get full user from token
  const user = await getUserFromToken();
  if (!user) return false;

  const owner = user.email;

  // If avatar uploaded, store in Page
  if (formData.has("avatar")) {
    const avatarLink = formData.get("avatar");
    if (avatarLink) {
      pageData.avatar = avatarLink;
    }
  }

  await Page.updateOne({ owner }, { $set: pageData }, { upsert: true });
  return true;
}

// --- Save buttons ---
export async function savePageButtons(formData) {
  await mongoose.connect(process.env.MONGODB_URI);

  const user = await getUserFromToken();
  if (!user) return false;

  const buttonsValue = {};
  formData.forEach((value, key) => {
    buttonsValue[key] = value;
  });

  await Page.updateOne({ owner: user.email }, { buttons: buttonsValue }, { upsert: true });
  return true;
}

// --- Save links ---
export async function savePageLinks(links) {
  await mongoose.connect(process.env.MONGODB_URI);

  const user = await getUserFromToken();
  if (!user) return false;

  await Page.updateOne({ owner: user.email }, { links }, { upsert: true });
  return true;
}
