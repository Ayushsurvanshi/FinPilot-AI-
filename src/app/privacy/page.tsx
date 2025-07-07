import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Server, Database, ShieldCheck, FileText, UserCheck } from "lucide-react";

const privacyFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All your financial data is encrypted in transit and at rest, ensuring that only you can access your information."
  },
  {
    icon: Server,
    title: "On-Device Processing",
    description: "Whenever possible, AI analysis happens locally on your device, minimizing data transmission and enhancing your privacy."
  },
  {
    icon: UserCheck,
    title: "User Data Ownership",
    description: "You have complete control over your personal financial information. You decide what to share and can export your data at any time."
  },
  {
    icon: ShieldCheck,
    title: "Zero-Knowledge Architecture",
    description: "Our system is designed to process your data without storing the raw, sensitive information, providing an additional layer of security."
  },
  {
    icon: FileText,
    title: "Transparent Audit Trail",
    description: "We maintain a complete and transparent log of all AI actions and recommendations, so you always know how your data is being used."
  },
  {
    icon: Database,
    title: "Data Portability",
    description: "You can easily export all of your data in standard, machine-readable formats, giving you the freedom to take your information with you."
  }
];

export default function PrivacyPage() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-headline font-bold">Privacy-First AI Architecture</h1>
        <p className="text-lg text-muted-foreground mt-2">Your trust and data security are our top priorities.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {privacyFeatures.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-4">
              <feature.icon className="h-10 w-10 text-primary" />
              <CardTitle className="font-headline">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
