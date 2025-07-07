import AnomalyDetector from "@/components/anomalies/anomaly-detector";

export default function AnomaliesPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-headline font-semibold">Intelligent Anomaly Detection</h1>
        <p className="text-muted-foreground">Analyze your spending to find unusual patterns and potential issues.</p>
      </div>
      <AnomalyDetector />
    </div>
  );
}
