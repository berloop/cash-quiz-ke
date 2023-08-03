"use client";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";

import { MessagesSquare, SparkleIcon, Sparkles } from "lucide-react";
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

import { FumarBot} from "@/components/fumarbot";
import { UserAvatar} from "@/components/user-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";




const ChatPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);



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
            //  throw new Error("Something Wrong")
            //assigning some messages...
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/chat", {
                messages: newMessages,
            });

            setMessages((current) => [...current, userMessage, response.data]);
           
            form.reset();

        } catch (error: any) {
            //if error is 403, Trial Expiry
            if(error?.response?.status === 403){
                 proModal.onOpen();
            } else{
                toast.error("Mmh! Something went wrong!");
            }

            console.log(error);
        } finally {
            router.refresh();
        }
    };


    return (
        <div>
            <Heading
                title="Chatbot UI"
                description="Your AI-powered Chat Companion"
                icon={Sparkles}
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
                                                placeholder="Ask me anything!"
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
             {isLoading &&(
                <div className="p-8 rounded-lg w-full flex items-center
                justify-center ">
                    <Loader />
                </div>
             )}
{/* bg-zinc-800/10 */}

               {/* check if there are no messages in here */}
                 {messages.length === 0 && !isLoading && (
                 <Empty label ="You haven't started any conversation yet!"/>
                 )}

                <div className="flex flex-col-reverse gap-y-4 p-5 rounded-lg">
                    {messages.map((message) => (
                        <div
                         key={message.content}
                          className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                          message.role === "user" ? "bg-muted" : "bg-zinc-800/10"
                          
                    )} 
                         >
                             
                             {message.role === "user" ? <UserAvatar /> : <FumarBot />}
                           <p className="text-sm">
                            {message.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}

export default ChatPage;