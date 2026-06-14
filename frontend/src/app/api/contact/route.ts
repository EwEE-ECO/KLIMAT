import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

    const response = await fetch(`${apiUrl}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, source: "Сайт" }),
    })

    if (!response.ok) throw new Error("API error")
    const data = await response.json()

    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
