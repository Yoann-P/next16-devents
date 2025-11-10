import EventForm from "@/components/EventForm";

const Page = () => {
    return (
        <main className={"min-lg:w-1/3 min-md:w-2/3 items-center justify-center"}>
            <article className={"w-full gapp-4 flex flex-col"}>
                <h1>Create Event</h1>

                <EventForm/>
            </article>
        </main>
    )
}
export default Page
