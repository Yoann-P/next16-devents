'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    title: z.string().min(2, { message: 'Title must be at least 2 characters long' }),
    description: z.string().min(1, { message: 'Description is required' }),
    overview: z.string().min(1, { message: 'Overview is required' }),
    venue: z.string().min(1, { message: 'Venue is required' }),
    location: z.string().min(1, { message: 'Location is required' }),
    date: z.string().min(1, { message: 'Date is required' }),
    time: z.string().min(1, { message: 'Time is required' }),
    mode: z.enum(['online', 'offline', 'hybrid'], { message: 'Mode must be online, offline, or hybrid' }),
    audience: z.string().min(1, { message: 'Audience is required' }),
    agenda: z.array(z.string().min(1, { message: 'Agenda item is required' })).min(1, { message: 'At least one agenda item is required' }),
    organizer: z.string().min(1, { message: 'Organizer is required' }),
    tags: z.array(z.string().min(1, { message: 'Tag is required' })).min(1, { message: 'At least one tag is required' }),
    image: z.instanceof(File, { message: 'Image is required' }),
});

export default function EventForm() {
    const [agendaItems, setAgendaItems] = useState(['']);
    const [tagsInput, setTagsInput] = useState('');
    const [tags, setTags] = useState(['']);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            overview: '',
            venue: '',
            location: '',
            date: '',
            time: '',
            mode: 'offline',
            audience: '',
            agenda: [''],
            organizer: '',
            tags: [''],
            image: undefined,
        },
    });

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagsInput(e.target.value);
        const tagsArray = e.target.value
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        setTags(tagsArray);
        form.setValue('tags', tagsArray, { shouldValidate: true });
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'tags' || key === 'agenda') {
                    formData.append(key, JSON.stringify(value));
                } else if (key === 'image') {
                    formData.append(key, value);
                } else {
                    formData.append(key, value);
                }
            });

            const response = await fetch('/api/events', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (!response.ok) {
                setMessage({ type: 'error', text: result.message || 'Error creating event' });
            } else {
                setMessage({ type: 'success', text: 'Event created successfully!' });
                setTimeout(() => {
                    router.push('/');
                }, 2000); // Redirection vers la page d'accueil
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="book-event">
                {/* ... tous tes champs existants ... */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a Title" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Briefly describe the event" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="overview"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Overview</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Event overview" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Venue</FormLabel>
                            <FormControl>
                                <Input placeholder="Venue" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input placeholder="Location" {...field} className="input pl-10" />
                                    <Image src="/icons/pin.svg" alt="location" width={18} height={18} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select a Date</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input type="date" {...field} className="pl-10" />
                                    <Image src="/icons/calendar.svg" alt="calendar" width={18} height={18} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start At</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input type="time" {...field} className="pl-10" />
                                    <Image src="/icons/clock.svg" alt="clock" width={18} height={18} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mode</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Event Mode" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-dark-200 text-neutral-50">
                                        <SelectItem value="online">Online</SelectItem>
                                        <SelectItem value="offline">Offline</SelectItem>
                                        <SelectItem value="hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="audience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Audience</FormLabel>
                            <FormControl>
                                <Input placeholder="Target audience" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="agenda"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Agenda</FormLabel>
                            <FormControl>
                                <div>
                                    {agendaItems.map((item, index) => (
                                        <Input
                                            key={index}
                                            placeholder={`09:45 AM - 11:00 AM | Deep Dives: Kubernetes, Data Analytics, Security ${index + 1}`}
                                            value={item}
                                            onChange={(e) => {
                                                const newItems = [...agendaItems];
                                                newItems[index] = e.target.value;
                                                setAgendaItems(newItems);
                                                field.onChange(newItems);
                                            }}
                                            className="input"
                                        />
                                    ))}
                                    <Button className={"mt-5"} type="button" onClick={() => {
                                        setAgendaItems([...agendaItems, '']);
                                        field.onChange([...agendaItems, '']);
                                    }}>
                                        Add Agenda
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="organizer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organizer</FormLabel>
                            <FormControl>
                                <Input placeholder="Organizer" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Event Image</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                onChange(e.target.files[0]);
                                            }
                                        }}
                                        className="pl-10"
                                        {...field}
                                    />
                                    <Image src="/icons/upload.svg" alt="upload" width={18} height={18} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="cursor-pointer">Submit</Button>
                {message && (
                    <div className={`mt-4 p-2 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </Form>
    );
}