import SimulationForm from "@/components/simulations/simulation-form";

export default function SimulationsPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-headline font-semibold">Advanced Scenario Simulations</h1>
        <p className="text-muted-foreground">Model different financial decisions and see their outcomes.</p>
      </div>
      <SimulationForm />
    </div>
  );
}
