import { NextResponse } from "next/server";

import clientPromise from "@/app/libs/mongoClient";

import jwt from "jsonwebtoken";



export async function GET(req) {

  try {

    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {

      return NextResponse.json({ user: null }, { status: 200 });

    }



    const token = authHeader.split(" ")[1];



    let decoded;

    try {

      decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (err) {

      return NextResponse.json({ user: null }, { status: 200 });

    }



    const email = decoded.email;



    const client = await clientPromise;

    const db = client.db();

    const users = db.collection("users");



    const user = await users.findOne({ email }, { projection: { password: 0 } });



    // Return null instead of 404 if no user

    return NextResponse.json({ user: user || null }, { status: 200 });



  } catch (error) {

    console.error("Error fetching user:", error);

    return NextResponse.json({ user: null }, { status: 500 });

  }

}