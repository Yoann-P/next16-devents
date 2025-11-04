import Event, { IEvent } from './event.model'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

async function connectToDB() {
    if (mongoose.connection.readyState === 1) return
    await mongoose.connect(MONGODB_URI)
}

// Ici on déclare simplement que getEvents retourne un tableau d'objets, sans forcer le typage strict
export async function getEvents(): Promise<any[]> {
    await connectToDB()
    const events = await Event.find().sort({ date: 1 }).lean()
    return events
}
