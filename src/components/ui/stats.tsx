"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const workforceData = [
  { year: 2015, women: 27.6, men: 72.4 },
  { year: 2016, women: 28.0, men: 72.0 },
  { year: 2017, women: 28.5, men: 71.5 },
  { year: 2018, women: 28.9, men: 71.1 },
  { year: 2019, women: 29.2, men: 70.8 },
  { year: 2020, women: 29.5, men: 70.5 },
  { year: 2021, women: 29.7, men: 70.3 },
  { year: 2022, women: 29.9, men: 70.1 },
  { year: 2023, women: 30.2, men: 69.8 },
]

const degreeData = [
  { year: 2015, women: 36, men: 64 },
  { year: 2016, women: 36, men: 64 },
  { year: 2017, women: 36, men: 64 },
  { year: 2018, women: 36, men: 64 },
  { year: 2019, women: 36, men: 64 },
  { year: 2020, women: 36, men: 64 },
  { year: 2021, women: 36, men: 64 },
]

const subfieldData = [
  { year: 2016, engineeringWomen: 8, engineeringMen: 92, scienceWomen: 41, scienceMen: 59 },
  { year: 2017, engineeringWomen: 11, engineeringMen: 89, scienceWomen: 42, scienceMen: 58 },
  { year: 2018, engineeringWomen: 10, engineeringMen: 90, scienceWomen: 42, scienceMen: 58 },
  { year: 2019, engineeringWomen: 10, engineeringMen: 90, scienceWomen: 46, scienceMen: 54 },
  { year: 2022, engineeringWomen: 12, engineeringMen: 88, scienceWomen: 44, scienceMen: 56 },
]

const graduationData = [
  { year: 2018, women: 35, men: 65 },
  { year: 2023, women: 35, men: 65 },
]

const COLORS = ["#8884d8", "#82ca9d"]

export default function STEMGenderAnalysis() {
  return (
    <div className="  gap-3">
      <div className="flex flex-col md:flex-row gap-2">
        <Card className="bg-[#d8e2dc] w-full md:w-1/2 ">
          <CardHeader>
            <CardTitle>Global STEM Workforce Representation (2015-2023)</CardTitle>
            <CardDescription>Percentage of women and men in the STEM workforce</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                women: {
                  label: "Women",
                  color: "hsl(var(--chart-1))",
                },
                men: {
                  label: "Men",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className=" w-full"
            >
              <ResponsiveContainer width="50%" height="100%">
                <LineChart data={workforceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend />
                  <Line type="monotone" dataKey="women" stroke="var(--color-women)" />
                  <Line type="monotone" dataKey="men" stroke="var(--color-men)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/2 ">
          <CardHeader>
            <CardTitle>STEM Degree Completion in the United States by Gender (2015-2021)</CardTitle>
            <CardDescription>Percentage of STEM degrees awarded to women and men</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                women: {
                  label: "Women",
                  color: "hsl(var(--chart-1))",
                },
                men: {
                  label: "Men",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="w-full"
            >
              <ResponsiveContainer width="50%" height="100%">
                <BarChart data={degreeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend />
                  <Bar dataKey="women" fill="var(--color-women)" />
                  <Bar dataKey="men" fill="var(--color-men)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <Card className="bg-[#d8e2dc] md:bg-white w-full md:w-1/2 ">
          <CardHeader>
            <CardTitle>Gender Distribution in STEM Subfields in the United States (2016-2022)</CardTitle>
            <CardDescription>Percentage of women and men in engineering and science professions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                engineeringWomen: {
                  label: "Engineering (Women)",
                  color: "hsl(var(--chart-1))",
                },
                engineeringMen: {
                  label: "Engineering (Men)",
                  color: "hsl(var(--chart-2))",
                },
                scienceWomen: {
                  label: "Science (Women)",
                  color: "hsl(var(--chart-3))",
                },
                scienceMen: {
                  label: "Science (Men)",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className=""
            >
              <ResponsiveContainer width="50%" height="100%">
                <BarChart data={subfieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend />
                  <Bar dataKey="engineeringWomen" fill="var(--color-engineeringWomen)" />
                  <Bar dataKey="engineeringMen" fill="var(--color-engineeringMen)" />
                  <Bar dataKey="scienceWomen" fill="var(--color-scienceWomen)" />
                  <Bar dataKey="scienceMen" fill="var(--color-scienceMen)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="w-full md:bg-[#d8e2dc] bg-white  md:w-1/2 ">
          <CardHeader>
            <CardTitle>Global STEM Graduation Rates by Gender (2018 and 2023)</CardTitle>
            <CardDescription>Percentage of STEM graduates who are women and men</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around">
              {graduationData.map((entry, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{entry.year}</h3>
                  <ChartContainer
                    config={{
                      women: {
                        label: "Women",
                        color: "hsl(var(--chart-1))",
                      },
                      men: {
                        label: "Men",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[200px] w-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Women", value: entry.women },
                            { name: "Men", value: entry.men },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: "Women", value: entry.women },
                            { name: "Men", value: entry.men },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

