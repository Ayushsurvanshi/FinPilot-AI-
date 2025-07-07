import { Bot, User, CircleDollarSign } from 'lucide-react';
import ChatInterface from '@/components/qa/chat-interface';

export default function QAPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="text-center p-4 border-b">
        <h1 className="text-2xl font-headline font-semibold">Smart Financial Q&amp;A</h1>
        <p className="text-muted-foreground">Ask me anything about your finances. I'm here to help.</p>
      </div>

      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <ChatInterface />
      </div>
    </div>
  );
}
