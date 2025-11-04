'use server';

import Event, { IEvent } from '@/database/event.model';
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string): Promise<IEvent[]> => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });
        if (!event) return [] as IEvent[];

        // Return Mongoose documents to match IEvent (which extends Document)
        return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } });
    } catch {
        return [] as IEvent[];
    }
}