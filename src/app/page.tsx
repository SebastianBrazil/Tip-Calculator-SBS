'use client'

import Image from "next/image";
import splitter from "@/app/assets/images/logo.svg"
import dollan from "@/app/assets/images/icon-dollar.svg"
import dollanDark from "@/app/assets/images/icon-person.svg"
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
          let tipPerPerson = (Math.floor((tipAmount / Number(peeps)) * 100)) / 100;

          let endResultOne: string;
          let endResultTwo: string;

          if (String(totPerPerson).indexOf(".") !== -1) {
            let checkEndOne = String(totPerPerson).split(".")
            let midResultOne = checkEndOne[1].padEnd(2, "0")
            endResultOne = checkEndOne[0] + "." + midResultOne;
          } else {
            endResultOne = totPerPerson + ".00";
          }

          if (String(tipPerPerson).indexOf(".") !== -1) {
            let checkEndTwo = String(tipPerPerson).split(".")
            let midResultTwo = checkEndTwo[1].padEnd(2, "0")
            endResultTwo = checkEndTwo[0] + "." + midResultTwo;
          } else {
            endResultTwo = tipPerPerson + ".00";
          }

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
    <div className="bg-[#c5e4e7] spaceMono">
      <div className="flex justify-center pt-36 -mb-36">
        <img className="w-20 h-12" src={splitter.src} alt="" />
      </div>

      <div className="min-h-screen grid place-items-center">
        <div className="bg-white w-8/12 h-3/6 rounded-[30px] pl-12 pr-8 py-8 gap-8 grid grid-cols-2">
          <div className="pr-2 grid py-4 grid-cols-1 place-content-between">
            <div>
              <p className="text-[#00494d] text-sm pb-1">Bill</p>
              <div>
                <input value={bill} onChange={(e) => setBill(e.target.value)} className="pr-4 spaceMonoB text-2xl text-[#00494d] text-right w-full rounded-md h-10 bg-[#f4fafa]" type="number" placeholder='0' />
                <img className="-mt-7 mb-[11px] ml-4" src={dollan.src} alt="" />
              </div>
            </div>

            <div>
              <p className="text-[#00494d] pb-4">Select Tip %</p>
              <div className="grid grid-cols-3 gap-4">
                <button className="rounded-md bg-[#00494d] py-2 text-[#f4fafa] text-2xl" onClick={() => { setCusTipP(""); setTipP("5") }}>5%</button>
                <button className="rounded-md bg-[#00494d] py-2 text-[#f4fafa] text-2xl" onClick={() => { setCusTipP(""); setTipP("10") }}>10%</button>
                <button className="rounded-md bg-[#00494d] py-2 text-[#f4fafa] text-2xl" onClick={() => { setCusTipP(""); setTipP("15") }}>15%</button>
                <button className="rounded-md bg-[#00494d] py-2 text-[#f4fafa] text-2xl" onClick={() => { setCusTipP(""); setTipP("25") }}>25%</button>
                <button className="rounded-md bg-[#00494d] py-2 text-[#f4fafa] text-2xl" onClick={() => { setCusTipP(""); setTipP("50") }}>50%</button>
                {
                  custTipP ? <input value={custTipP} onChange={(e) => { setTipP(""); setCusTipP(e.target.value) }} className="spaceMonoB text-[#00494d] text-2xl text-right w-full rounded-md bg-[#f4fafa] py-2 pr-4" type="number" placeholder='Custom' /> : <input value={custTipP} onChange={(e) => { setTipP(""); setCusTipP(e.target.value) }} className="spaceMonoB text-[#00494d] text-2xl text-center w-full rounded-md bg-[#f4fafa]" type="number" placeholder='Custom' />
                }
                </div>
            </div>

            <div>
              <div className="flex justify-between">
                <p className="text-[#00494d] pb-1 text-sm">Number Of People</p>
                {
                  isPeepsZero && <p>Can't be zero</p>
                }
              </div>
              <div className="">
                <input value={peeps} onChange={(e) => setPeeps(e.target.value)} className="pr-4 spaceMonoB text-2xl text-[#00494d] text-right w-full rounded-md h-10 bg-[#f4fafa]" type="number" placeholder='0' />
                <img className="-mt-7 mb-[11px] ml-4" src={dollanDark.src} alt="" />
              </div>
            </div>
          </div>

          <div className="bg-[#00494d] flex justify-center rounded-xl">
            <div className=" w-4/5 grid grid-cols-1 place-content-between">

              <div>
                <div className="flex justify-between py-12">
                  <div>
                    <p className="text-[#f4fafa] text-sm">Tip Amount</p>
                    <p className="text-[#7f9c9f] text-xs">/ person</p>
                  </div>
                  <div>
                    {
                      tipOnlyAmount ? <p className="spaceMonoB text-[#26c0ab] text-[46px] lineH">${tipOnlyAmount}</p> : <p className="text-[#26c0ab] spaceMonoB text-[46px] lineH">$0.00</p>
                    }
                  </div>
                </div>

                <div className="flex justify-between">
                  <div>
                    <p className="text-[#f4fafa] text-sm">Total</p>
                    <p className="text-[#7f9c9f] text-xs">/ person</p>
                  </div>
                  <div>
                    {
                      totalPerPerson ? <p className="spaceMonoB text-[#26c0ab] text-[46px] lineH">${totalPerPerson}</p> : <p className="text-[#26c0ab] spaceMonoB text-[46px] lineH">$0.00</p>
                    }
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="bg-[#26c0ab] h-12 rounded-md text-xl pt-[2px] mb-10 text-[#00494d] w-full spaceMonoB" onClick={() => resetValues()}>RESET</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
