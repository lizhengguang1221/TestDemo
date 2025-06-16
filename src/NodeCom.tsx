import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import dayjs from "dayjs";
import Test from "./pages/ManageMemuber/Index";

import "./App.css";
interface IPROPS {
  name: string;
  stage: string;
  date: string;
  color: string;
}
function Demo(props: IPROPS) {
  const { name, stage, date, color } = props;
  const [count, setCount] = useState(0);
  //   useEffect(() => {
  //     console.log("33");
  //     // debugger;
  //     return;
  //   }, [props]);
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ backgroundColor: color }} className="badageStyle" />
          <div className="lineStyle" />
          <div style={{ fontWeight: 700 }}>【{name}】</div>
          <div style={{ fontWeight: 700 }}>【{stage}】</div>
          <div style={{ color: "gray" }}>
            【{dayjs(date).format("YYYY.MM.DD")}】
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
