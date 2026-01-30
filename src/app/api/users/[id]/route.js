"use server";

import { NextResponse } from "next/server";
import axios from "axios";

// Base URL of your Spring Boot application (replace with your actual Spring API URL)
const SPRING_API_URL = "http://localhost:8080/api/users";

export async function handler(req, { params }) {
  const { id } = params;

  try {
    switch (req.method) {
      // **GET**: Fetch user by ID
      case "GET":
        const getResponse = await axios.get(`${SPRING_API_URL}/${id}`);
        return NextResponse.json(getResponse.data, { status: 200 });

      // **PUT**: Update user by ID
      case "PUT":
        const body = await req.json();
        const usersData = body.formData;

        // Send the updated user data to the Spring backend
        const updateResponse = await axios.put(`${SPRING_API_URL}/${id}`, usersData);
        return NextResponse.json({ message: "User updated successfully", data: updateResponse.data }, { status: 200 });

      // **DELETE**: Delete user by ID
      case "DELETE":
        await axios.delete(`${SPRING_API_URL}/${id}`);
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });

      default:
        return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
