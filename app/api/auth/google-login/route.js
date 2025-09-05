
// app/api/auth/google-login/route.js

import { NextResponse } from "next/server";

import { OAuth2Client } from "google-auth-library";

import mongoose from "mongoose";

import { User } from "@/app/models/User";

import jwt from "jsonwebtoken";



const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);



export async function POST(req) {

  try {

    const { credential } = await req.json(); // ID token from frontend



    // Verify the Google ID token

    const ticket = await client.verifyIdToken({

      idToken: credential,

      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

    });



    const payload = ticket.getPayload(); // email, name, picture, sub (Google ID)



    // Connect to MongoDB

    if (!mongoose.connection.readyState) {

      await mongoose.connect(process.env.MONGODB_URI);

    }



    // Upsert user (find by email, create if not exists)

    let user = await User.findOne({ email: payload.email });

    if (!user) {

      user = await User.create({

        name: payload.name,

        email: payload.email,

        image: payload.picture,

        googleId: payload.sub,

      });

    }



    // Sign a JWT

    const token = jwt.sign(

      { id: user._id, email: user.email, name: user.name, image: user.image },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }

    );



    return NextResponse.json({ success: true, user, token }, {

      headers: {

        "Set-Cookie": `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=604800`

      }

    }); // <--- return token

  } catch (error) {

    console.error("Google login error:", error);

    return NextResponse.json(

      { success: false, error: error.message },

      { status: 500 }

    );

  }

}