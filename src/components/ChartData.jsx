import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ChartData = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center">Loading.....</div>;
  }

  const filerData = data.map((item) => ({
    title: item.title,
    จำนวน: item.pricePer,
    มูลค่า: item.valuePrice,
  }));

  console.log("chat", filerData);

  const chartConfig = Object.keys(filerData[0]) // ดึง keys จาก object แรกใน data
    .filter((key) => key !== "title") // กรอง key ที่ไม่ต้องการ เช่น "month"
    .reduce((config, key, index) => {
      config[key] = {
        label: key.toUpperCase(),
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return config;
    }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>วิเคราะห์ข้อมูลทรัพยากร</CardTitle>
        <CardDescription>
          แสดงผลทรัพยากรทั้งหมดในช่วงวันที่ผ่านมา
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={filerData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="title"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                type="natural"
                fill={chartConfig[key].color}
                fillOpacity={0.4}
                stroke={chartConfig[key].color}
                stackId="a"
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              คาดการว่าจะไปในทางที่ดี <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              ธันวาคม 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default ChartData;
