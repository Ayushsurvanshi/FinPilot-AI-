"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DollarSign, TrendingUp, Target, Zap } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
}

const pieData = [
    { name: 'Stocks', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Mutual Funds', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Bonds', value: 200, fill: 'hsl(var(--chart-3))' },
    { name: 'Cash', value: 100, fill: 'hsl(var(--chart-4))' },
];

const recentTransactions = [
    { id: 1, description: "Reliance Industries", amount: 2500.75, type: "Buy", status: "Completed" },
    { id: 2, description: "Monthly SIP - Index Fund", amount: 5000.00, type: "SIP", status: "Processed" },
    { id: 3, description: "Tata Motors", amount: -1200.50, type: "Sell", status: "Completed" },
    { id: 4, description: "Adani Power", amount: 800.00, type: "Buy", status: "Pending" },
]

const financialGoals = [
    { id: 1, name: "Retirement Fund", progress: 65, target: "₹2,00,00,000" },
    { id: 2, name: "Dream House Downpayment", progress: 40, target: "₹25,00,000" },
    { id: 3, name: "Child's Education", progress: 80, target: "₹50,00,000" },
]

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">₹12,45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline text-green-600">+14.2%</div>
            <p className="text-xs text-muted-foreground">Annualized Return</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Reached</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">1 / 3</div>
            <p className="text-xs text-muted-foreground">Emergency fund goal met</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">AI Recommendation</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
             <div className="text-sm font-semibold text-primary">Consider rebalancing your portfolio to optimize tax savings.</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
            <CardDescription>Your portfolio value over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `₹${value / 100}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Breakdown</CardTitle>
            <CardDescription>Asset allocation of your investments.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={{}} className="h-64 w-full">
                <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} strokeWidth={2}>
                         {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                </PieChart>
             </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
              <CardHeader>
                  <CardTitle>Financial Goals</CardTitle>
                  <CardDescription>Tracking your progress towards your goals.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-6">
                      {financialGoals.map(goal => (
                          <div key={goal.id}>
                              <div className="flex justify-between items-center mb-1">
                                  <p className="text-sm font-medium">{goal.name}</p>
                                  <p className="text-sm text-muted-foreground">{goal.progress}% - {goal.target}</p>
                              </div>
                              <Progress value={goal.progress} />
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>
          <Card>
              <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your recent investment activities.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow>
                              <TableHead>Description</TableHead>
                              <TableHead className="text-right">Amount (₹)</TableHead>
                              <TableHead className="text-center">Status</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                         {recentTransactions.map(tx => (
                          <TableRow key={tx.id}>
                              <TableCell>
                                <div className="font-medium">{tx.description}</div>
                                <div className="text-xs text-muted-foreground">{tx.type}</div>
                              </TableCell>
                              <TableCell className={`text-right font-medium ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                                {tx.amount.toLocaleString('en-IN')}
                              </TableCell>
                              <TableCell className="text-center">
                                  <Badge variant={tx.status === 'Completed' || tx.status === 'Processed' ? 'default' : 'secondary'}
                                    className={`${tx.status === 'Completed' || tx.status === 'Processed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'}`}
                                  >
                                      {tx.status}
                                  </Badge>
                              </TableCell>
                          </TableRow>
                         ))}
                      </TableBody>
                  </Table>
              </CardContent>
          </Card>
      </div>
    </div>
  )
}
