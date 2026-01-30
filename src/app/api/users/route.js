"use server";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import axios from "axios";

// Base URL of your Spring Boot application (replace with your actual Spring API URL)
const SPRING_API_URL = "http://localhost:8080/api/users";

// POST Request: Create new user
export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Step 1: Check if the user already exists in the Spring backend
    const existsResponse = await axios.get(SPRING_API_URL, {
      params: { email, username },
    });

    if (existsResponse.data.length > 0) {
      // If user exists, return an error response
      return NextResponse.json(
        { message: "Username or email already exists" },
        { status: 400 }
      );
    }

    // Step 2: Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 3: Send a request to the Spring backend to create the user
    const createUserResponse = await axios.post(SPRING_API_URL, {
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

// GET Request: Fetch all users
export async function GET() {
  try {
    // Step 1: Fetch all users from the Spring backend
    const response = await axios.get(SPRING_API_URL);

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
