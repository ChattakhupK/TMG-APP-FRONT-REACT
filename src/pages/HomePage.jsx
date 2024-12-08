import List from "@/components/List";
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
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [toggleMode, setToggleMode] = useState("dark");
  useEffect(() => {
    handleGetData();
  }, []);

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
        <div className="mx-auto mt-4 max-w-[640px]">
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
              {data.map((item, index) => (
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
                          {toggleMode === "dark" ? (
                            <img src="../../public/tmgLogow.png" alt="" />
                          ) : (
                            <img src="../../public/tmgLogob.png" alt="" />
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
