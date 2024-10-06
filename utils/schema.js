import { integer, pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core";

export const GRADES = pgTable('grades',{
    id:serial('id').primaryKey(),
    grade:varchar('grade',{length:10}).notNull()
})

export const STUDENTS = pgTable('students',{
    id:serial('id').primaryKey(),
    name:varchar('name',{maxlength:30}).notNull(),
    grade:varchar('grade',{length:10}).notNull(),
    address:varchar('address',{length:50}),
    contact:varchar('contact',{length:10})
})

export const ATTENDANCE = pgTable('attendance',{
    id:serial('id').primaryKey(),
    studentId:integer('studentId').notNull(),
    present:boolean('present').default(false),
    day:integer('day').notNull(),
    date:varchar('date').notNull()
})