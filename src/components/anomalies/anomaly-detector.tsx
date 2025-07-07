"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { checkForAnomalies } from "@/app/anomalies/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState = {
  result: null,
  error: null,
};

const defaultSpendingData = JSON.stringify([
    { "category": "Dining", "amount": 8500, "date": "2023-10-15" },
    { "category": "Groceries", "amount": 6000, "date": "2023-10-16" },
    { "category": "Shopping", "amount": 25000, "date": "2023-10-17" },
    { "category": "Utilities", "amount": 15000, "date": "2023-10-18" },
    { "category": "Travel", "amount": 1200, "date": "2023-10-19" },
], null, 2);

const defaultUserProfile = JSON.stringify({
    "typicalSpending": { "Dining": 4000, "Groceries": 7000, "Shopping": 10000, "Utilities": 5000 },
    "income": 80000,
    "financialGoals": ["Save for vacation", "Invest in stocks"]
}, null, 2);


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Detect Anomalies
    </Button>
  );
}

export default function AnomalyDetector() {
  const [state, formAction] = useActionState(checkForAnomalies, initialState);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Input Data</CardTitle>
          <CardDescription>Provide spending data and user profile in JSON format.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div>
              <Label htmlFor="spendingData">Spending Data</Label>
              <Textarea
                id="spendingData"
                name="spendingData"
                rows={10}
                defaultValue={defaultSpendingData}
                className="font-code"
              />
            </div>
            <div>
              <Label htmlFor="userProfile">User Profile</Label>
              <Textarea
                id="userProfile"
                name="userProfile"
                rows={10}
                defaultValue={defaultUserProfile}
                className="font-code"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detection Results</CardTitle>
          <CardDescription>Anomalies will be displayed here after analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          {state.error && <p className="text-red-500">{state.error}</p>}
          {state.result ? (
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Analysis Summary</AlertTitle>
                <AlertDescription>{state.result.summary}</AlertDescription>
              </Alert>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.result.anomalies.map((anomaly: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                          <div className="font-medium">{anomaly.category}</div>
                          <div className="text-xs text-muted-foreground">{new Date(anomaly.date).toLocaleDateString()}</div>
                      </TableCell>
                      <TableCell>₹{anomaly.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell>{anomaly.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">Awaiting analysis...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
