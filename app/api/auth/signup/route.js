import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    // Check if user already exists
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      if (existingUser.password) {
        return NextResponse.json(
          { message: "User already exists" },
          { status: 400 }
        );
      } else {
        // User exists via OAuth (no password)
        // Update user with password (account linking)
        const hashedPassword = await bcrypt.hash(password, 12);
        await users.updateOne(
          { email },
          { $set: { password: hashedPassword } }
        );
        return NextResponse.json(
          { message: "Password set for existing account" },
          { status: 201 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "User created", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
