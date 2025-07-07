import VoiceAssistant from "@/components/voice/voice-assistant";

export default function VoicePage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-headline font-semibold">Advanced Voice Intelligence</h1>
        <p className="text-muted-foreground">Interact with your finances using your voice.</p>
      </div>
      <VoiceAssistant />
    </div>
  );
}
