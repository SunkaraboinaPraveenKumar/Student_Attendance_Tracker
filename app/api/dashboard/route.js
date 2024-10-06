import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, eq, count, desc } from "drizzle-orm"; // Import count function
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;

    const date = searchParams.get('date');
    const grade = searchParams.get('grade');

    const result = await db.select({
        day: ATTENDANCE.day,
        presentCount: count(ATTENDANCE.day), // Use count directly from drizzle-orm
    })
        .from(ATTENDANCE)
        .leftJoin(STUDENTS, and(eq(ATTENDANCE.studentId, STUDENTS.id), eq(ATTENDANCE.date, date)))
        .groupBy(ATTENDANCE.day) // Group by date
        .where(
            eq(STUDENTS.grade, grade)
        )
        .orderBy(desc(ATTENDANCE.day)) // Order by date in descending order
        .limit(7);

    return NextResponse.json(result);
}
