'use client'

import Image from "next/image";
import splitter from "@/app/assets/images/logo.svg"
import { useEffect, useState } from "react";

export default function Home() {
  const [bill, setBill] = useState<string>("");
  const [tipP, setTipP] = useState<string>("");
  const [custTipP, setCusTipP] = useState<string>("");
  const [peeps, setPeeps] = useState<string>("");
  const [isPeepsZero, setIsPeepsZero] = useState<boolean>();

  const [totalPerPerson, setTotalPerPerson] = useState<string>();
  const [tipOnlyAmount, setTipOnlyAmount] = useState<string>();

  const calculate = () => {
    if (peeps === "0") {
      setIsPeepsZero(true);
      setTotalPerPerson(undefined);
      setTipOnlyAmount(undefined);
    } else {
      let tipPHolder: string;
      if (custTipP !== "") {
        tipPHolder = custTipP;
      } else {
        tipPHolder = tipP;
      }

      setIsPeepsZero(false);
      if (bill !== "" && bill !== "0" && tipPHolder !== "" && peeps !== "") {
        if (tipPHolder === "0") {
          setTotalPerPerson(String(Number(bill) / Number(peeps)));
          setTipOnlyAmount(undefined);
        } else {
          let tipAmount = Number(bill) * (Number(tipPHolder) / 100)
          let totAmount = Number(bill) + tipAmount
          let totPerPerson = (Math.round((totAmount / Number(peeps)) * 100)) / 100;
          let tipPerPerson = (Math.round((tipAmount / Number(peeps)) * 100)) / 100;
          
          let checkEndOne = String(totPerPerson).split(".")
          let midResultOne = checkEndOne[1].padEnd(2, "0")
          let endResultOne = checkEndOne[0] + "." + midResultOne;
          let checkEndTwo = String(tipPerPerson).split(".")
          let midResultTwo = checkEndTwo[1].padEnd(2, "0")
          let endResultTwo = checkEndTwo[0] + "." + midResultTwo;

          setTotalPerPerson(endResultOne);
          setTipOnlyAmount(endResultTwo);
        }
      } else {
        setTotalPerPerson(undefined);
        setTipOnlyAmount(undefined);
      }
    }
  };

  const resetValues = () => {
    setBill("");
    setTipP("");
    setCusTipP("");
    setPeeps("");
    setIsPeepsZero(false);
    setTotalPerPerson(undefined);
    setTipOnlyAmount(undefined);
  }

  useEffect(() => {
    calculate();
  }, [bill, tipP, peeps, custTipP])

  return (
    <div className="bg-[#c5e4e7]">
      <div className="flex justify-center pt-36 -mb-36">
        <img className="w-18 h-12" src={splitter.src} alt="" />
      </div>

      <div className="min-h-screen grid place-items-center">
        <div className="bg-white w-8/12 h-3/6 rounded-[30px] grid grid-cols-2">
          <div className="my-10 mr-4 ml-8">
            <p className="">Bill</p>
            <input value={bill} onChange={(e) => setBill(e.target.value)} className="w-full rounded-md h-10 bg-[#f4fafa]" type="number" placeholder='0' />

            <p>Select Tip %</p>
            <div className="grid grid-cols-3">
              <button onClick={() => { setCusTipP(""); setTipP("5") }}>5%</button>
              <button onClick={() => { setCusTipP(""); setTipP("10") }}>10%</button>
              <button onClick={() => { setCusTipP(""); setTipP("15") }}>15%</button>
              <button onClick={() => { setCusTipP(""); setTipP("25") }}>25%</button>
              <button onClick={() => { setCusTipP(""); setTipP("50") }}>50%</button>
              <input value={custTipP} onChange={(e) => { setTipP(""); setCusTipP(e.target.value) }} className="w-12 rounded-md h-12 bg-[#f4fafa]" type="number" placeholder='Custom' />
              <button>Custom</button>
            </div>

            <div className="flex justify-between">
              <p>Number Of People</p>
              {
                isPeepsZero && <p>Can't be zero</p>
              }
            </div>
            <input value={peeps} onChange={(e) => setPeeps(e.target.value)} className="w-full rounded-md h-10 bg-[#f4fafa]" type="number" placeholder='0' />
          </div>

          <div className="bg-[#00494d] my-10 ml-4 mr-8">
            <div className="flex justify-between">
              <div>
                <p>Tip Amount</p>
                <p>/ person</p>
              </div>
              <div>
                {
                  tipOnlyAmount ? <p className="text-[#26c0ab]">${tipOnlyAmount}</p> : <p className="text-[#26c0ab]">$0.00</p>
                }              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="">Total</p>
                <p className="">/ person</p>
              </div>
              <div>
                {
                  totalPerPerson ? <p className="text-[#26c0ab]">${totalPerPerson}</p> : <p className="text-[#26c0ab]">$0.00</p>
                }
              </div>
            </div>

            <div className="flex justify-center">
              <button onClick={() => resetValues()}>Reset</button>
            </div>

          </div>
        </div>
      </div>

    </div>

  );
}
