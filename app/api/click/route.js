import { Event } from "@/app/models/Event";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const { searchParams } = new URL(req.url);
    const encodedUrl = searchParams.get("url");
    const page = searchParams.get("page");

    if (!encodedUrl || !page) {
      return Response.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Decode base64 encoded link
    const clickedLink = Buffer.from(encodedUrl, "base64").toString("utf8");
    // or: const clickedLink = atob(encodedUrl);

    await Event.create({ type: "click", uri: clickedLink, page });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Click tracking error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
