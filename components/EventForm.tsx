"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import React, { useState } from "react"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {types} from "@/lib/constants";
import {Textarea} from "@/components/ui/textarea";
import Image from "next/image";

const formSchema = z.object({
    title: z.string().min(2, {message: "Title must be at least 2 characters long"}),
    date: z.string().min(1, {message: "Date is required"}),
    startTime: z.string().min(1, {message: "Duration is required"}),
    location: z.string().min(1, {message: "Location is required"}),
    type: z.string().min(1, {message: "Type is required"}),
    image: z.instanceof(File, {message: "Image is required"}),
    tags: z.array(z.string().min(1, {message: "Tag is required"})).min(1, {message: "At least one tag is required"}),
    description: z.string().min(1, {message: "Description is required"}),
})

const EventForm = () => {
    // State local pour la saisie des tags sous forme de string
    const [tagsInput, setTagsInput] = useState("");

    // RHF
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            date: "",
            startTime: "",
            location: "",
            type: "",
            image: "",
            tags: [],
            description: "",
        },
    })

    // Permet de synchroniser l’input et le champ RHF tags à chaque modification
    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagsInput(e.target.value);
        const tagsArray = e.target.value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
        form.setValue("tags", tagsArray, { shouldValidate: true });
    };

    // Handler submit : values.tags est déjà au bon format
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // Suite logique (envoi à l’API, etc.)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id={"book-event"}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter a Title" {...field}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Select a Date</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input
                                        type="date"
                                        {...field}
                                        className="pl-10"
                                    />
                                    <Image
                                        src="/icons/calendar.svg"
                                        alt="calendar"
                                        width={18}
                                        height={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startTime"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Start At</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input
                                        type="time" {...field}
                                        className="pl-10"
                                    />
                                    <Image
                                        src="/icons/clock.svg"
                                        alt="clock"
                                        width={18}
                                        height={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <div className={"relative w-full"}>
                                    <Input
                                        placeholder="Location" {...field}
                                        className="input pl-10"
                                    />
                                    <Image
                                        src="/icons/pin.svg"
                                        alt="location"
                                        width={18}
                                        height={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className={"w-full"}>
                                        <SelectValue placeholder="Event Type"/>
                                    </SelectTrigger>
                                    <SelectContent className={"bg-dark-200 text-neutral-50"}>
                                        {types.map((type) => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Event Image</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                                        className={"pl-10"}
                                    />
                                    <Image
                                        src="/icons/upload.svg"
                                        alt="calendar"
                                        width={18}
                                        height={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Add tags such as React, Next.js, Symfony..."
                                    value={tagsInput}
                                    onChange={handleTagsChange}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Event Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Briefly describe the event" {...field}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className={"cursor-pointer"}>Submit</Button>
            </form>
        </Form>
    )
}
export default EventForm
