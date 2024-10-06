import { db } from "@/utils";
import { STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const data = await req.json();

        // Validate incoming data before inserting
        if (!data.name || !data.grade || !data.address || !data.contact) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        // Insert into the database
        const result = await db.insert(STUDENTS)
            .values({
                name: data.name,
                grade: data.grade,
                address: data.address,
                contact: data.contact
            });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error inserting student:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req){
    const result =await db.select().from(STUDENTS);
    return NextResponse.json(result);
}


export async function DELETE(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: "ID is required." }, { status: 400 });
        }

        const result = await db.delete(STUDENTS).where(eq(STUDENTS.id, id));

        if (result.rowCount === 0) {
            return NextResponse.json({ message: "Record not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Record deleted successfully." });
    } catch (error) {
        console.error('Error deleting student:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
