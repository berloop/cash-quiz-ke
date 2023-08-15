"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 50) + 10,
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

