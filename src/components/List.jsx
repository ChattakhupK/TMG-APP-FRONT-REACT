import axios from "axios";
import { Button } from "./ui/button";
import { removeData, updateData } from "../api/resources";
import { useState } from "react";
import { Input } from "./ui/input";
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

const List = ({ item, handleGetData, countXvalue }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [dataForm, setDataForm] = useState({
    title: item.title,
    pricePer: item.pricePer,
    valuePrice: item.valuePrice,
  });
  const handleDel = async (id) => {
    console.log(id);
    removeData(id)
      .then((res) => {
        console.log(res);
        handleGetData();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    setIsEdit(!isEdit);
    console.log(id);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]:
        name === "pricePer" || name === "valuePrice" ? Number(value) : value,
    });
  };

  const handleConfirm = (id) => {
    setIsEdit(!isEdit);
    console.log(id, dataForm);
    updateData(id, dataForm)
      .then((res) => {
        console.log(res);
        handleGetData();
      })
      .catch((err) => console.log(err));
  };

  console.log(isEdit);
  return (
    <>
      {isEdit ? (
        <>
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              <Input
                value={dataForm.title}
                name="title"
                onChange={handleOnChange}
                type="text"
              />
            </TableCell>
            <TableCell>
              <Input
                value={dataForm.pricePer}
                onChange={handleOnChange}
                name="pricePer"
                type="text"
              />
            </TableCell>
            <TableCell>
              <Input
                value={dataForm.valuePrice}
                onChange={handleOnChange}
                name="valuePrice"
                type="text"
              />
            </TableCell>
            <TableCell className="text-right">
              {countXvalue(item.pricePer, item.valuePrice).toLocaleString(
                "th-TH"
              )}
            </TableCell>
            <div className="flex mt-2 gap-2 items-center justify-center">
              <Button
                className={
                  "w-[75px] bg-green-600 text-white hover:bg-green-700"
                }
                onClick={() => handleConfirm(item.id)}
              >
                ยืนยัน
              </Button>
              <Button
                variant="secondary"
                className={"w-[75px]"}
                onClick={() => setIsEdit(false)}
              >
                ยกเลิก
              </Button>
            </div>
          </TableRow>
        </>
      ) : (
        <>
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
            <TableCell className="text-right flex justify-center gap-2">
              <Button
                className={"w-[75px] bg-gray-600 text-white hover:bg-gray-700"}
                onClick={() => handleEdit(item.id)}
              >
                แก้ไข
              </Button>
              <Button
                variant="destructive"
                className={"w-[75px]"}
                onClick={() => handleDel(item.id)}
              >
                ลบ
              </Button>
            </TableCell>
          </TableRow>
        </>
      )}
    </>
  );
};
export default List;
