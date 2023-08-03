"use client";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";

import { Activity, MessagesSquare, Music2Icon, PackageCheck, SparkleIcon, Sparkles } from "lucide-react";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

import { FumarBot } from "@/components/fumarbot";
import { UserAvatar } from "@/components/user-avatar";

import ReactAudioPlayer from 'react-audio-player';
import { EmptyMusic } from "@/components/empty-music";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";




const MusicPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [music, setMusic] = useState<string>();



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

            setMusic(undefined);

            const response = await axios.post("/api/music", values);

            setMusic(response.data.audio);

            // form.reset();

        } catch (error: any) {
            //if error is 403, Trial Expiry
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Mmh! Something went wrong!");
            }
        } finally {
            router.refresh();
        }
    };


    return (
        <div>
            <Heading
                title="FumarTunes™"
                description="Your AI-powered Music Creator"
                icon={Activity}
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
                                                placeholder="Create me a piano solo!"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full hover:shadow-lg " disabled={isLoading}>
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
                    {!music && !isLoading && (
                        <EmptyMusic label="You haven't created any music yet!" />

                    )}

                    {music && (
                        <div>

                            <p className="m-3 text-sm">Successfully generated a music file with FumarTunes&trade;</p>
                            <audio controls className="w-full mt-4">
                                <source src={music} />
                            </audio>

                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

export default MusicPage;