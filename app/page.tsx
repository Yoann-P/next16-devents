import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database";
import {cacheLife} from "next/cache";
import {getEvents} from "@/database/event";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page =async () =>{
    "use cache";
    cacheLife("hours")

    const response = await fetch(`${BASE_URL}/api/events`)
    const events: IEvent[] = await getEvents()

    return (
        <section>
            <h1 className={"text-center"}>Le Hub pour chaque événement <br/> Dev à ne pas manquer</h1>
            <p className={"text-center mt-5"}>Hackatons, Meetups, & Conférences, réunis en un seul endroit</p>
            <ExploreBtn/>

            <div className="mt-20 space-y-7 ">
                <h3>Featured Events</h3>

                <ul className={"events"}>
                    {events && events.length >0 &&events.map((event:IEvent) => (
                        <li key={event.title}>
                            <EventCard {...event}/>
                        </li>

                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Page
