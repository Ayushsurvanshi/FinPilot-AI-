"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const initialData = {
  initialInvestment: 500000,
  monthlySip: 20000,
  expectedReturn: 12,
  timePeriod: 15,
};

export default function SimulationForm() {
  const [data, setData] = useState(initialData);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleSliderChange = (name: string, value: number[]) => {
    setData((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const runSimulation = () => {
    let futureValue = data.initialInvestment;
    const monthlyReturn = data.expectedReturn / 100 / 12;
    const newChartData = [];
    
    for (let i = 1; i <= data.timePeriod; i++) {
        let yearlyValue = futureValue;
        for (let m = 0; m < 12; m++) {
            yearlyValue = (yearlyValue + data.monthlySip) * (1 + monthlyReturn);
        }
        futureValue = yearlyValue;
        newChartData.push({ year: i, value: Math.round(futureValue) });
    }
    setChartData(newChartData);
  };
  
  const totalInvested = data.initialInvestment + (data.monthlySip * 12 * data.timePeriod);
  const totalValue = chartData.length > 0 ? chartData[chartData.length - 1].value : 0;
  const wealthGained = totalValue - totalInvested;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Simulation Parameters</CardTitle>
          <CardDescription>Adjust the sliders to see different outcomes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="initialInvestment">Initial Investment (₹)</Label>
            <Input id="initialInvestment" name="initialInvestment" value={data.initialInvestment} onChange={handleInputChange} />
            <Slider value={[data.initialInvestment]} onValueChange={(val) => handleSliderChange("initialInvestment", val)} max={2000000} step={50000} />
          </div>
          <div className="space-y-3">
            <Label htmlFor="monthlySip">Monthly SIP (₹)</Label>
            <Input id="monthlySip" name="monthlySip" value={data.monthlySip} onChange={handleInputChange} />
            <Slider value={[data.monthlySip]} onValueChange={(val) => handleSliderChange("monthlySip", val)} max={100000} step={1000} />
          </div>
          <div className="space-y-3">
            <Label htmlFor="expectedReturn">Expected Return (% p.a.)</Label>
            <Input id="expectedReturn" name="expectedReturn" value={data.expectedReturn} onChange={handleInputChange} />
            <Slider value={[data.expectedReturn]} onValueChange={(val) => handleSliderChange("expectedReturn", val)} max={30} step={1} />
          </div>
          <div className="space-y-3">
            <Label htmlFor="timePeriod">Time Period (Years)</Label>
            <Input id="timePeriod" name="timePeriod" value={data.timePeriod} onChange={handleInputChange} />
            <Slider value={[data.timePeriod]} onValueChange={(val) => handleSliderChange("timePeriod", val)} max={40} step={1} />
          </div>
          <Button onClick={runSimulation} className="w-full">Run Simulation</Button>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Projected Growth</CardTitle>
          <CardDescription>Visual representation of your investment growth.</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" unit="y" />
                        <YAxis tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} />
                        <Tooltip formatter={(val: number) => `₹${val.toLocaleString('en-IN')}`}/>
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} name="Projected Value" />
                    </LineChart>
                </ResponsiveContainer>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Invested</p>
                        <p className="font-semibold font-headline text-lg">₹{totalInvested.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                        <p className="font-semibold font-headline text-lg text-primary">₹{totalValue.toLocaleString('en-IN')}</p>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Wealth Gained</p>
                        <p className="font-semibold font-headline text-lg text-green-600">₹{wealthGained.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Run a simulation to see your projected growth.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
