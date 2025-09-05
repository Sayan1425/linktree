'use server'
import mongoose from "mongoose";
import { Page } from "../models/Page";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function grabUsername(formData) {
  const username = formData.get('username');
  await mongoose.connect(process.env.MONGODB_URI);

  const existingPage = await Page.findOne({ uri: username });
  if (existingPage) return false; // Username taken

  // Get logged-in user from JWT
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) throw new Error("User not authenticated");

  let decoded;
  try {
    decoded = jwt.decode(token);
    if (!decoded?.email) throw new Error("Invalid token");
  } catch (err) {
    console.error("JWT decode error:", err);
    throw new Error("Failed to decode token");
  }

  // Create page for user
  // Create the page document
  const newPageDoc = await Page.create({
    uri: username,
    owner: decoded.email,
  });

  // Convert the Mongoose document to a plain object before returning
  return JSON.parse(JSON.stringify(newPageDoc));
}
