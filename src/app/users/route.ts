import { NextResponse } from "next/server";

interface User {
    name: string;
    email: string
}

const users: User[] = []

export function GET() {

    return NextResponse.json(users)
}

export async function POST(req: Request) {
    const body: User = await req.json()
    users.push(body)

    return NextResponse.json({
        message: "success",
        data: users
    }, {
        status: 201
    })
}