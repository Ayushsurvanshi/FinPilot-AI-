"use client";

import { useFormState, useFormStatus } from "react-dom";
import { processVoiceQuery } from "@/app/voice/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, Loader2, Send, Bot, User, Play, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";

const initialState = {
  result: null,
  error: null,
};

type Message = {
    role: "user" | "assistant";
    text: string;
    audio?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      <Button type="submit" size="icon" className="hidden md:inline-flex" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      </Button>
      <Button variant="ghost" size="icon" className="md:hidden" disabled={pending}>
        <Mic className="h-5 w-5" />
      </Button>
    </>
  );
}

export default function VoiceAssistant() {
  const [state, formAction] = useFormState(processVoiceQuery, initialState);
  const [messages, setMessages] = useState<Message[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playingMessageId, setPlayingMessageId] = useState<number | null>(null);

  useEffect(() => {
    if (state.result) {
        setMessages((prev) => [
            ...prev,
            { role: "assistant", text: state.result.response, audio: state.result.audioResponse }
        ]);
    } else if (state.error) {
        setMessages((prev) => [
            ...prev,
            { role: "assistant", text: state.error }
        ]);
    }
  }, [state]);

  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;
    if (query.trim()) {
      setMessages((prev) => [...prev, { role: "user", text: query }]);
      formAction(formData);
      formRef.current?.reset();
    }
  };

  const playAudio = (audioSrc: string, messageId: number) => {
    if (audioRef.current) {
        if (playingMessageId === messageId) {
            audioRef.current.pause();
            setPlayingMessageId(null);
        } else {
            audioRef.current.src = audioSrc;
            audioRef.current.play();
            setPlayingMessageId(messageId);
        }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.onended = () => {
            setPlayingMessageId(null);
        };
    }
  }, []);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-4 h-[50vh] overflow-y-auto pr-2">
            {messages.map((msg, index) => (
                 <div
                    key={index}
                    className={cn(
                    "flex items-start gap-3",
                    msg.role === "user" ? "justify-end" : ""
                    )}
                >
                     {msg.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                     )}
                     <div className={cn("rounded-lg p-3 text-sm max-w-sm", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        <p>{msg.text}</p>
                        {msg.audio && (
                            <Button variant="ghost" size="sm" className="mt-2 -ml-2" onClick={() => playAudio(msg.audio!, index)}>
                                {playingMessageId === index ? <Square className="h-4 w-4 mr-2"/> : <Play className="h-4 w-4 mr-2"/> }
                                Play Response
                            </Button>
                        )}
                     </div>
                     {msg.role === "user" && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                     )}
                </div>
            ))}
            {useFormStatus().pending && (
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback></Avatar>
                    <div className="rounded-lg p-3 text-sm bg-muted"><Loader2 className="h-5 w-5 animate-spin" /></div>
                </div>
            )}
        </div>
        <form ref={formRef} action={handleFormSubmit} className="mt-6 flex items-center gap-2 border-t pt-4">
          <Input name="query" placeholder="Type or say something..." className="flex-1" />
          <SubmitButton />
        </form>
        <audio ref={audioRef} className="hidden" />
      </CardContent>
    </Card>
  );
}
