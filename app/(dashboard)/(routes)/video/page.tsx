"use client";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";

import { Activity, FileVideo2Icon, MessagesSquare, Music2Icon, PackageCheck, SparkleIcon, Sparkles } from "lucide-react";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

import { FumarBot } from "@/components/fumarbot";
import { UserAvatar } from "@/components/user-avatar";

import { EmptyMusic } from "@/components/empty-music";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";




const VideoPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [video, setVideo] = useState<string>();



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            //takes the prompt..
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            setVideo(undefined);

            const response = await axios.post("/api/video", values);

            setVideo(response.data[0]);

            form.reset();

        } catch (error: any) {
             //if error is 403, Trial Expiry
             if(error?.response?.status === 403){
                proModal.onOpen();
           }
           else{
            toast.error("Mmh! Something went wrong!");
        }
        } finally {
            router.refresh();
        }
    };


    return (
        <div>
            <Heading
                title="FumarOsiris™"
                description="Your Next-Gen AI-powered Video Creator."
                icon={FileVideo2Icon}
                iconColor="text-[#121212]"
                bgColor="bg-zinc-800/10"
            />

            <div className="px-4 lg:px-8">

                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6
                         focus-within:shadow-sm
                         grid
                         grid-cols-12
                         gap-2">
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Try a Clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full hover:shadow-lg bg-[#121212] " disabled={isLoading}>
                                <Sparkles className="mr-2 h-4 w-4" /> Fumar It!
                            </Button>
                        </form>
                    </Form>
                </div>
                

                <div className="space-y-4 mt-4" >
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center
                justify-center ">
                            <Loader />
                        </div>
                    )}
                    {/* bg-zinc-800/10 */}

                    {/* check if there are no messages in here */}
                    {!video && !isLoading && (
                        <EmptyMusic label="You haven't created any videos yet!" />
                        
                    )}

                    {video && (
                        
                            // <p className="m-3 text-sm text-muted-foreground bg-black rounded-lg p-3">..Successfully generated a video with <strong className="font-bolder">FumarOsiris&trade;</strong></p>
                            <video className="w-full aspect-video mt-5 rounded-lg border bg-black" controls>
                                <source src={video} />
                            </video>
                            
                        

                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPage;