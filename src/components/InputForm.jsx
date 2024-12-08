import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import axios from "axios";

const InputForm = ({ setForm, form, setCount, count }) => {
  const [title, setTitle] = useState("");
  const [pricePer, setpricePer] = useState();
  const [valuePrice, setvaluePrice] = useState();

  useEffect(() => {
    handleAddData();
  }, []);

  const handleAddData = async () => {
    const newData = {
      title: title,
      pricePer: Number(pricePer),
      valuePrice: Number(valuePrice),
    };
    console.log(newData);

    await axios
      .post("https://tmg-app-back-api.vercel.app/api/resources/", newData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddData();
    setCount(count++);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-[200px]">
      <h1 className="text-center mb-4 font-semibold text-xl">เพิ่มทรัพยากร</h1>
      <div className="flex gap-2">
        <Input
          onChange={(e) => setTitle(e.target.value)}
          className="w-5/6"
          name="title"
          type="text"
          placeholder="ไอเทม"
        />
        <Input
          onChange={(e) => setpricePer(e.target.value)}
          className="w-2/6"
          name="pricePer"
          type="number"
          placeholder="จำนวน"
        />
        <Input
          onChange={(e) => setvaluePrice(e.target.value)}
          className="w-2/6"
          name="valuePrice"
          type="number"
          placeholder="ราคาต่อชิ้น"
        />
      </div>

      <Button type="submit" className="w-full mt-2">
        เพิ่มของ
      </Button>
    </form>
  );
};
export default InputForm;
