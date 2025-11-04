"use server"

import connectDB from "@/lib/mongodb";
import {Booking} from "@/database";

export const createBooking = async ({eventId, email, slug}: { eventId: string; email: string; slug: string }) => {
    try {
        await connectDB()
        await Booking.create({ eventId, email, slug })
        return {success: true}
    } catch (e) {
        console.error("create booking failed", e)
        return {success: false}
    }
}