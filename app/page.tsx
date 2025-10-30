import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import events from "@/lib/constants";


const Page = () => {
    return (
        <section>
            <h1 className={"text-center"}>Le Hub pour chaque événement <br/> Dev à ne pas manquer</h1>
            <p className={"text-center mt-5"}>Hackatons, Meetups, & Conférences, réunis en un seul endroit</p>
            <ExploreBtn/>

            <div className="mt-20 space-y-7 ">
                <h3>Featured Events</h3>

                <ul className={"events"}>
                    {events.map((event) => (
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
