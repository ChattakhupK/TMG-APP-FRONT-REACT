import List from "@/components/List";
import axios from "axios";
import { useEffect, useState } from "react";

import { getData, createData } from "../../api/resources";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManagePage = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [pricePer, setPricePer] = useState(0);
  const [valuePrice, setValuePrice] = useState(0);

  //newData from input
  const [newData, setnewData] = useState({});

  //password
  const [checkPass, setCheckPass] = useState(false);
  const [password, setPasword] = useState("");

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    getData()
      .then((res) => {
        console.log(res);
        setData(res.data.getData);
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    const updatedValue = name === "title" ? value : Number(value);

    if (name === "title") {
      setTitle(value);
    } else if (name === "pricePer") {
      setPricePer(Number(value));
    } else if (name === "valuePrice") {
      setValuePrice(Number(value));
    }
    const newData = {
      title: title,
      pricePer: pricePer,
      valuePrice: valuePrice,
    };
    setnewData({
      ...newData,
      [name]: updatedValue,
    });
  };

  const handleAndData = () => {
    createData(newData)
      .then((res) => {
        console.log(res);
        handleGetData();
      })
      .catch((err) => console.log(err));
  };

  const countXvalue = (count, value) => {
    const sum = count * value;
    return sum;
  };

  const handleChangePass = (e) => {
    setPasword(e.target.value);
  };

  const handleCheckPass = () => {
    if (password === "1234") {
      setCheckPass(true);
    }
  };

  return (
    <div className="mx-auto">
      {checkPass ? (
        <>
          <>
            <div className="mx-9">
              <h1 className="text-center mb-4 font-bold text-xl">ตารางแก้ไข</h1>
              <Table className={"max-w-[940px] mx-auto"}>
                <TableCaption className={"my-2"}>
                  ตารางแสดงผลข้อมูลทั้งหมด โดยสามารถแก้ไขหรือลบได้
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px] w-[150px]">
                      ชื่อไอเทม
                    </TableHead>
                    <TableHead className="w-[150px]">จำนวน</TableHead>
                    <TableHead className="w-[150px]">มูลค่าต่อชิ้น</TableHead>
                    <TableHead className="text-right">มูลค่ารวม</TableHead>
                    <TableHead className="text-center">การทำงาน</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <List
                      data={data}
                      key={index}
                      item={item}
                      handleGetData={handleGetData}
                      countXvalue={countXvalue}
                    />
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
            </div>
            <Card className="w-[350px] mx-auto">
              <CardHeader>
                <CardTitle>เพิ่มข้อมูลของทรัพยากร</CardTitle>
                <CardDescription>
                  ใส่ข้อมูลทรัพยากรที่ได้ และ จะนำไปแสดงผล
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">ชื่อไอเทม</Label>
                      <Input
                        onChange={(e) => {
                          handleOnChange(e);
                        }}
                        type="text"
                        name="title"
                        id="name"
                        placeholder="กรอกชื่อที่ต้องการ"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex w-[120px] flex-col space-y-1.5">
                        <Label htmlFor="name">จำนวน</Label>
                        <Input
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                          type="number"
                          name="pricePer"
                          id="name"
                          placeholder="ใส่จำนวนไอเทม"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">มูลค่า</Label>
                        <Input
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                          type="number"
                          name="valuePrice"
                          id="name"
                          placeholder="ใส่มูลค่าต่อไอเทม 1 หน่วย"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <span className="text-red-500">
                    ตรวจเช็คแบบฟอร์มก่อนยืนยัน**
                  </span>
                </div>
                <Button onClick={handleAndData}>ยืนยัน</Button>
              </CardFooter>
            </Card>
          </>
        </>
      ) : (
        <>
          <div className="flex mx-auto h-[600px] w-full max-w-sm items-center space-x-2">
            <Input
              onChange={handleChangePass}
              type="password"
              placeholder="กรอกรหัส "
            />
            <Button onClick={handleCheckPass} type="submit">
              ยืนยันรหัสผ่าน
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
export default ManagePage;
