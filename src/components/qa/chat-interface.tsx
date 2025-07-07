"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { askFinancialQuestion } from "@/app/qa/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string | React.ReactNode;
};

const initialState = {
  answer: null,
  error: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="icon" disabled={pending}>
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
        </Button>
    );
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, formAction] = useActionState(askFinancialQuestion, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.answer) {
        const { answer, emotionalSupport, predictiveAnalysis } = state.answer;
        const assistantResponse = (
            <div className="space-y-4">
                <p>{answer}</p>
                {emotionalSupport && (
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" />Emotional Support</h4>
                        <p className="text-sm text-muted-foreground">{emotionalSupport}</p>
                    </div>
                )}
                {predictiveAnalysis && (
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" />Predictive Analysis</h4>
                        <p className="text-sm text-muted-foreground">{predictiveAnalysis}</p>
                    </div>
                )}
            </div>
        );
      setMessages((prev) => [...prev, { role: "assistant", content: assistantResponse }]);
    } else if (state.error) {
      setMessages((prev) => [...prev, { role: "assistant", content: state.error }]);
    }
  }, [state]);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleFormSubmit = async (formData: FormData) => {
    const question = formData.get("question") as string;
    if (question.trim()) {
      setMessages((prev) => [...prev, { role: "user", content: question }]);
      formAction(formData);
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      <div ref={chatContainerRef} className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-muted/30 p-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="h-12 w-12 text-primary" />
            <h2 className="mt-4 text-xl font-semibold font-headline">Welcome to FinPilot AI</h2>
            <p className="mt-2 text-muted-foreground">You can ask me questions like "Am I ready to buy a house?"</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-4",
              message.role === "user" ? "justify-end" : ""
            )}
          >
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
              </Avatar>
            )}
            <Card className={cn(message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card')}>
                <CardContent className="p-3 text-sm">
                {message.content}
                </CardContent>
            </Card>
            {message.role === "user" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {useFormStatus().pending && (
            <div className="flex items-start gap-4">
                 <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                </Avatar>
                <Card className="bg-card">
                    <CardContent className="p-3 text-sm">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </CardContent>
                </Card>
            </div>
        )}
      </div>
      <form ref={formRef} action={handleFormSubmit} className="mt-4 flex items-center gap-2">
        <Input
          name="question"
          placeholder="Ask a financial question..."
          className="flex-1"
          autoComplete="off"
        />
        <SubmitButton />
      </form>
    </div>
  );
}
