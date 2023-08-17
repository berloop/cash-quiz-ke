"use client";
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { auth, useUser } from '@clerk/nextjs';
import * as z from 'zod';
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FileQuestion, HelpCircle, Lightbulb, Sparkles, SparklesIcon } from 'lucide-react';
import { FormField, FormItem, FormControl, Form, FormMessage, FormDescription, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from "@/components/ui/toast"
import { toast, useToast } from "@/components/ui/use-toast"
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';




const CreatePage: React.FC = () => {

    useEffect(() => {
        //   isLoading(true)
      }, [])
    

    const showSuccessToast = () => {
        toast({
            className:"bg-[#121212] text-white border border-green-800 shadow-xl shadow-green-500/10",
            title: "Successfully created a Trivia Question!",
            description: `Happy Trails above n' beyond!🎉😎`,
            action: <ToastAction className='hover:bg-gradient-to-l from-green-500 to-green-800 border-green-800'
                altText="closeMe">Dismiss</ToastAction>,
        });
    };

    const showErrorToast = () => {
        toast({
            className:"bg-[#121212] text-white border border-red-800 shadow-xl shadow-red-500/10",
            title: "Uh! Something must've gone wrong!",
            description: `Please try again yeah?!😟`,
            action: <ToastAction className='hover:bg-gradient-to-l from-red-500 to-red-800 border-red-800'
            altText="closeMe">Dismiss</ToastAction>,
        });
    };



    //creating form schema...
    const formSchema = z.object({
        question: z.string().min(10),
        options: z.array(z.string().min(1)),
        answer: z.string().min(1),
        showName: z.string().min(4)
    });


    //creating a form 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: '',
            options: ["", "", "", ""],
            answer: '',
            showName: '',

        }

    });

    const router = useRouter();
    const { user } = useUser();
    user?.fullName


    const isLoading = form.formState.isSubmitting;



    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const triviaPayload = {
                question:values.question,
                options:values.options,
                answer:values.answer,
                showName:values.showName
            };

            //sending the payload to our API endpoint..
            const response = await axios.post('/api/createtrivia', { triviaPayload });

            
            console.log(response.data);
            console.log(values);
            showSuccessToast();
            form.reset();

        } catch (error: any) {

            if (error?.response?.status === 403) {

            } else {
                console.log(error);
                showErrorToast();
            }

            console.log(error);
        } finally {
            router.refresh();
        }
    };


    






    return (
        <div className="px-5 py-4 text-white">
            <h1 className="text-2xl font-bold mb-2 text-center">Hi, {user?.fullName || "Admin"}!</h1>
            <div className="mb-4 space-y-2">
                <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NdotoTrivia:</span> Admin Console
                </h2>
                <p className="text-white font-normal text-zinc-400 text-sm md:text-lg text-center">
                    Create and Manage Trivia Questions.
                </p>
            </div>
            {/* <Button variant={'ndotored'} onClick={showErrorToast}> Test Me Toast</Button> */}


            <Card className="mt-4 p-5 transition hover:border-red-500/10 hover:shadow-red-500/10">
                <CardHeader>
                    <CardTitle className="text-white flex gap-2">
                        <Sparkles />
                        Create a New Trivia Question</CardTitle>
                       

                </CardHeader>

                <CardContent>
                {/* <Separator className="mt-2 bg-zinc-700" /> */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>


                            <div className="mb-4">
                                <FormField
                                    name="question"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 lg:col-span-10">
                                            <FormLabel className='text-zinc-400 font-medium text-sm'>Main Question*</FormLabel>
                                            <FormControl className="m-0 p-0">
                                                <Input className="max-w-full rounded-none bg-[#121212] text-zinc-400  border border-[#3E3D3D] p-2"
                                                    disabled={isLoading}
                                                    placeholder="Which celebrity aired the John Doe Show?.."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className='text-zinc-600 text-xs'>
                                                <div className='flex gap-x-1'>
                                                    <FileQuestion className='flex text-xs' size={15} /> Write here the main trivia question...
                                                </div>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            
                            </div>

                            <div className="mb-4 px-2 md:px-8">
                                <Label className="text-zinc-400 font-medium text-sm mb-3">Choice A*</Label>
                                <Input disabled={isLoading} placeholder="It was Victor Frankeinsten.."
                                    className="max-w-full rounded-none bg-[#121212] text-zinc-400 my-2 border border-[#3E3D3D] "
                                    {...form.register('options.0')}
                                />
                               <Label className="text-zinc-400 font-medium text-sm mb-3">Choice B*</Label>
                               <Input disabled={isLoading} placeholder="It was Evander Magnus.."
                                    className="max-w-full rounded-none my-2 bg-[#121212] text-zinc-400  border border-[#3E3D3D] p-2"
                                    {...form.register('options.1')}
                                />
                                <Label className="text-zinc-400 font-medium text-sm mb-3">Choice C*</Label>
                                <Input disabled={isLoading} placeholder="It was Lionel Pessi.."
                                    className="max-w-full rounded-none my-3 bg-[#121212] text-zinc-400  border border-[#3E3D3D] p-2"
                                    {...form.register('options.2')}
                                />
                                <Label className="text-zinc-400 font-medium text-sm mb-3">Choice D*</Label>
                                <Input disabled={isLoading} placeholder="It was Wakanda's Prince.."
                                    className="max-w-full rounded-none my-3 bg-[#121212] text-zinc-400  border border-[#3E3D3D] p-2"
                                    {...form.register('options.3')}
                                />
                            </div>

                            <div className="mb-4">
                               
                                 <FormField
                                    name="answer"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 lg:col-span-10">
                                            <FormLabel className='text-zinc-400 font-medium text-sm'>Question Answer*</FormLabel>
                                            <FormControl className="m-0 p-0">
                                                <Input className="max-w-full rounded-none bg-[#121212] text-zinc-400  border border-[#3E3D3D] p-2"
                                                    disabled={isLoading}
                                                    placeholder="It was Evander Magnus.."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className='text-zinc-600 text-xs'>
                                                <div className='flex gap-x-1'>
                                                    <Lightbulb className='flex text-xs' size={15} /> Note: The answer should 100% match it's choice in writing.
                                                </div>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-4">
                                 <FormField
                                    name="showName"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 lg:col-span-10">
                                            <FormLabel className='text-zinc-400 font-medium text-sm'>Show Name*</FormLabel>
                                            <FormControl className="m-0 p-0">
                                                <Input className="max-w-full rounded-none bg-[#121212] text-zinc-400  border border-[#3E3D3D] p-2"
                                                    disabled={isLoading}
                                                    placeholder="Gert.."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className='text-zinc-600 text-xs'>
                                                <div className='flex gap-x-1'>
                                                    <Lightbulb className='flex text-xs' size={15} /> Note: Show name should be communicated to Tech.
                                                </div>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                         
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    variant="ndoto"
                                    className="font-bold"
                                    disabled={form.formState.isSubmitting} >
                                        <SparklesIcon className='mr-2 w-6 h-6' />
                                    Create Trivia Question
                                </Button>
                            </div>
                        </form>
                    </Form>

                </CardContent>
            </Card>




        </div>
    );
};

export default CreatePage;
