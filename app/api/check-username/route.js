import mongoose from "mongoose";

import { Page } from "../../models/Page";



export async function POST(req) {

  try {

    const { username } = await req.json();



    if (!username || username.trim().length === 0) {

      return new Response(JSON.stringify({ available: false, error: "Invalid username" }), { status: 400 });

    }



    // Connect to MongoDB

    await mongoose.connect(process.env.MONGODB_URI);



    const existing = await Page.findOne({ uri: username.trim() });



    if (existing) {

      return new Response(JSON.stringify({ available: false }), { status: 200 });

    } else {

      return new Response(JSON.stringify({ available: true }), { status: 200 });

    }



  } catch (err) {

    console.error("Check username error:", err);

    return new Response(JSON.stringify({ available: false, error: "Server error" }), { status: 500 });

  }

}