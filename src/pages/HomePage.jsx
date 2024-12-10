import { getData } from "@/api/resources";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import tmgLogoW from "../../public/tmgLogow.png";
import tmgLogoB from "../../public/tmgLogob.png";
import { useTheme } from "@/components/theme-provider";
import ChartData from "@/components/ChartData";

const HomePage = () => {
  const [data, setData] = useState([]);
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const handleGetData = async () => {
    await getData()
      .then((res) => {
        console.log(res.data.getData);
        setData(res.data.getData);
      })
      .catch((err) => console.log(err));
  };

  const countXvalue = (count, value) => {
    const sum = count * value;
    return sum;
  };

  return (
    <div className="mx-auto">
      <div className="mx-14">
        <h1 className="text-center uppercase font-bold text-xl">
          การแสดงผลหลัก
        </h1>
        <Card className="w-[100px] mx-auto my-6">
          <CardHeader className="text-center">
            <CardTitle>Radio</CardTitle>
            <CardDescription>696</CardDescription>
          </CardHeader>
        </Card>
        <div className="mx-auto mt-4 max-w-[640px]">
          <ChartData data={data} />
          <hr className="my-6" />
          <Table className={"max-w-[940px] mx-auto"}>
            <TableCaption className={"my-2"}>
              ตารางแสดงผลข้อมูลทั้งหมด พร้อมมูลค่าสินทรัพย์
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px] w-[150px]">
                  ชื่อไอเทม
                </TableHead>
                <TableHead className="w-[150px]">จำนวน</TableHead>
                <TableHead className="w-[150px]">มูลค่าต่อชิ้น</TableHead>
                <TableHead className="text-right">มูลค่ารวม</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium uppercase">
                    {item.title}
                  </TableCell>
                  <TableCell className="font-medium uppercase">
                    {item.pricePer.toLocaleString("th-TH")}
                  </TableCell>
                  <TableCell className="font-medium uppercase">
                    {item.valuePrice.toLocaleString("th-TH")}
                  </TableCell>
                  <TableCell className="font-medium uppercase text-right">
                    {countXvalue(item.pricePer, item.valuePrice).toLocaleString(
                      "th-TH"
                    )}
                  </TableCell>
                  <TableCell className="text-right flex justify-center gap-2"></TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>มูลค่าสินทรัพย์ทั้งหมด</TableCell>
                <TableCell className="text-left"></TableCell>
                <TableCell className="text-right">
                  {data
                    .reduce(
                      (total, item) =>
                        total + countXvalue(item.pricePer, item.valuePrice),
                      0
                    )
                    .toLocaleString()}
                </TableCell>
                <TableCell className="text-left"></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <hr className="mb-8" />
          <Carousel
            plugins={[
              Autoplay({
                delay: 3500,
              }),
            ]}
            className="mx-auto w-full max-w-sm"
          >
            <CarouselContent className="-ml-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-2xl font-semibold">
                          {isDarkMode ? (
                            <img
                              className="select-none pointer-events-none"
                              src={tmgLogoW}
                              alt=""
                            />
                          ) : (
                            <img
                              className="select-none pointer-events-none"
                              src={tmgLogoB}
                              alt=""
                            />
                          )}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
