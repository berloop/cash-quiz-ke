"use client"


import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"


const data = [
  {
    name: "Jan",
    total: 2,
  },
  {
    name: "Feb",
    total: 234,
  },
  {
    name: "Mar",
    total: 334,
  },
  {
    name: "Apr",
    total: 453,
  },
  {
    name: "May",
    total: 1643,
  },
  {
    name: "Jun",
    total: 2000,
  },
  {
    name: "Jul",
    total: 564,
  },
  {
    name: "Aug",
    total: 400,
  },
  {
    name: "Sep",
    total: 2174,
  },
  {
    name: "Oct",
    total: 3242,
  },
  {
    name: "Nov",
    total: 5232,
  },
  {
    name: "Dec",
    total: 5700,
  },
]

export function AdminOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#ed2324"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => `${value}`}
        />
        <Bar dataKey="total" stroke="#ed2324" fill="#ed2324" gradientTransform="" strokeWidth={2} gradientUnits=""  radius={[0, 20, 20, 20]}
        label="User" />
      </BarChart>
    </ResponsiveContainer>
    
  )
}

