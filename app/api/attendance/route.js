import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { eq, and, or, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import moment from "moment";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get('grade');
  const month = searchParams.get('month');

  // Format the month for comparison (assuming ATTENDANCE.date is in 'DD/MM/YYYY' format)
  const monthYear = moment(month, 'MM/YYYY').format('MM/YYYY');

  // Perform the query
  const result = await db
    .select({
      name: STUDENTS.name,        // Student name from STUDENTS table
      present: ATTENDANCE.present,
      day: ATTENDANCE.day,
      date: ATTENDANCE.date,
      grade: STUDENTS.grade,
      studentId: STUDENTS.id,
      attendanceId: ATTENDANCE.id,
    })
    .from(STUDENTS)
    .leftJoin(
      ATTENDANCE, 
      and(eq(STUDENTS.id, ATTENDANCE.studentId),eq(ATTENDANCE.date, monthYear)
    ))
    .where(eq(STUDENTS.grade,grade))

  return NextResponse.json(result);
}

export async function POST(req,res){
  const data =await req.json();
  const result = await db.insert(ATTENDANCE)
  .values({
    studentId:data.studentId,
    present:data.present,
    day:data.day,
    date:data.date
  })

  return NextResponse.json(result);
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const studentId = searchParams.get('studentId');
  const date = searchParams.get('date');
  const day = searchParams.get('day');

  const result = await db.delete(ATTENDANCE)
    .where(
      and(
        eq(ATTENDANCE.studentId, studentId),
        eq(ATTENDANCE.day, day),
        eq(ATTENDANCE.date, date)
      )
    );

  return NextResponse.json(result);
}

