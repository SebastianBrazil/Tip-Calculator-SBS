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

  const [isButtonSelected1, setIsButtonSelected1] = useState<boolean>(false);
  const [isButtonSelected2, setIsButtonSelected2] = useState<boolean>(false);
  const [isButtonSelected3, setIsButtonSelected3] = useState<boolean>(false);
  const [isButtonSelected4, setIsButtonSelected4] = useState<boolean>(false);
  const [isButtonSelected5, setIsButtonSelected5] = useState<boolean>(false);

  const calculate = () => {
    let isAllPeepsZero: boolean = false;
    if (peeps.length !== 0) {
      let splitPeeps = peeps.split("");
      let boolValues: boolean[] = [];

      splitPeeps.forEach(number => {
        boolValues.push(Number(number) === 0)
      })

      if (boolValues.indexOf(false) === -1) {
        isAllPeepsZero = true;
      }
    }

    if (isAllPeepsZero === true) {
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
          let totalPre = String(Number(bill) / Number(peeps))

          if (totalPre.indexOf(".") !== -1) {
            let checkEndSolo = totalPre.split(".")
            let midResultSolo = checkEndSolo[1].padEnd(2, "0")
            totalPre = checkEndSolo[0] + "." + midResultSolo;
          } else {
            totalPre = totalPre + ".00";
          }

          setTotalPerPerson(totalPre);
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
    setIsButtonSelected1(false);
    setIsButtonSelected2(false);
    setIsButtonSelected3(false);
    setIsButtonSelected4(false);
    setIsButtonSelected5(false);
  }

  const activateBtn1 = () => {
    setIsButtonSelected1(true);
    setIsButtonSelected2(false);
    setIsButtonSelected3(false);
    setIsButtonSelected4(false);
    setIsButtonSelected5(false);
  }
  const activateBtn2 = () => {
    setIsButtonSelected1(false);
    setIsButtonSelected2(true);
    setIsButtonSelected3(false);
    setIsButtonSelected4(false);
    setIsButtonSelected5(false);
  }
  const activateBtn3 = () => {
    setIsButtonSelected1(false);
    setIsButtonSelected2(false);
    setIsButtonSelected3(true);
    setIsButtonSelected4(false);
    setIsButtonSelected5(false);
  }
  const activateBtn4 = () => {
    setIsButtonSelected1(false);
    setIsButtonSelected2(false);
    setIsButtonSelected3(false);
    setIsButtonSelected4(true);
    setIsButtonSelected5(false);
  }
  const activateBtn5 = () => {
    setIsButtonSelected1(false);
    setIsButtonSelected2(false);
    setIsButtonSelected3(false);
    setIsButtonSelected4(false);
    setIsButtonSelected5(true);
  }
  const deactivateBtns = () => {
    setIsButtonSelected1(false);
    setIsButtonSelected2(false);
    setIsButtonSelected3(false);
    setIsButtonSelected4(false);
    setIsButtonSelected5(false);
  }

  useEffect(() => {
    calculate();
  }, [bill, tipP, peeps, custTipP])

  return (
    <div className="bg-[#c5e4e7] spaceMono min-h-screen h-full grid place-content-evenly">
      <div className="flex justify-center py-10 lg:-mt-10">
        <img className="w-20 h-12" src={splitter.src} alt="" />
      </div>

      <div className="grid place-items-center lg:-mt-24">
        <div className="bg-white lg:w-8/12 rounded-t-3xl lg:rounded-[30px] pl-7 pr-7 lg:pl-12 lg:pr-8 py-8 gap-8 grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:pr-2 grid lg:py-4 grid-cols-1 place-content-between">
            <div className="lg:pb-10">
              <p className="text-[#00494d] pb-1">Bill</p>
              <div className="max-lg:pb-8">
                <input value={bill} onChange={(e) => setBill(e.target.value)} className="input2 pr-4 spaceMonoB text-2xl text-[#00494d] text-right w-full rounded-md h-10 bg-[#f4fafa]" type="number" placeholder='0' />
                <img className="-mt-7 mb-[11px] ml-5" src={dollan.src} alt="" />
              </div>
            </div>

            <div className="pb-10">
              <p className="text-[#00494d] pb-4">Select Tip %</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {
                  isButtonSelected1 ? <button className="hober rounded-md bg-[#26c0ab] py-2 text-[#00494d] text-2xl" onClick={() => { activateBtn1(); setCusTipP(""); setTipP("5") }}>5%</button> : <button className="hober rounded-md bg-[#00494d] py-2 text-[#f4fafa] text-2xl" onClick={() => { activateBtn1(); setCusTipP(""); setTipP("5") }}>5%</button>
                }
                {
                  isButtonSelected2 ? <button className="hober rounded-md bg-[#26c0ab] py-2 text-[#00494d] text-2xl" onClick={() => { activateBtn2(); setCusTipP(""); setTipP("10") }}>10%</button> : <button className="hober rounded-md bg-[#00494d] py-2 text-[#f4fafa] text-2xl" onClick={() => { activateBtn2(); setCusTipP(""); setTipP("10") }}>10%</button>
                }
                {
                  isButtonSelected3 ? <button className="hober rounded-md bg-[#26c0ab] py-2 text-[#00494d] text-2xl" onClick={() => { activateBtn3(); setCusTipP(""); setTipP("15") }}>15%</button> : <button className="hober rounded-md bg-[#00494d] py-2 text-[#f4fafa] text-2xl" onClick={() => { activateBtn3(); setCusTipP(""); setTipP("15") }}>15%</button>
                }
                {
                  isButtonSelected4 ? <button className="hober rounded-md bg-[#26c0ab] py-2 text-[#00494d] text-2xl" onClick={() => { activateBtn4(); setCusTipP(""); setTipP("25") }}>25%</button> : <button className="hober rounded-md bg-[#00494d] py-2 text-[#f4fafa] text-2xl" onClick={() => { activateBtn4(); setCusTipP(""); setTipP("25") }}>25%</button>
                }
                {
                  isButtonSelected5 ? <button className="hober rounded-md bg-[#26c0ab] py-2 text-[#00494d] text-2xl" onClick={() => { activateBtn5(); setCusTipP(""); setTipP("50") }}>50%</button> : <button className="hober rounded-md bg-[#00494d] py-2 text-[#f4fafa] text-2xl" onClick={() => { activateBtn5(); setCusTipP(""); setTipP("50") }}>50%</button>
                }
                {
                  custTipP ? <input value={custTipP} onChange={(e) => { deactivateBtns(); setTipP(""); setCusTipP(e.target.value) }} className="input1 spaceMonoB text-[#00494d] text-2xl text-right w-full rounded-md bg-[#f4fafa] py-2 pr-4" type="number" placeholder='Custom' /> : <input value={custTipP} onChange={(e) => { deactivateBtns(); setTipP(""); setCusTipP(e.target.value) }} className="input1 spaceMonoB text-[#00494d] text-2xl text-center w-full rounded-md bg-[#f4fafa]" type="number" placeholder='Custom' />
                }
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <p className="text-[#00494d] pb-1">Number Of People</p>
                {
                  isPeepsZero && <p className="text-sm pb-1 text-[#dc755e]">Can't be zero</p>
                }
              </div>
              <div>
                {
                  isPeepsZero ? <input value={peeps} onChange={(e) => setPeeps(e.target.value)} className="pr-4 spaceMonoB text-2xl text-[#00494d] text-right w-full rounded-md h-10 input2Zero bg-[#f4fafa]" type="number" placeholder='0' /> : <input value={peeps} onChange={(e) => setPeeps(e.target.value)} className="input2 pr-4 spaceMonoB text-2xl text-[#00494d] text-right w-full rounded-md h-10 bg-[#f4fafa]" type="number" placeholder='0' />
                }
                <img className="-mt-7 mb-[11px] ml-4" src={dollanDark.src} alt="" />
              </div>
            </div>
          </div>

          <div className="bg-[#00494d] flex justify-center rounded-xl">
            <div className="w-[85%] lg:w-4/5 grid grid-cols-1 place-content-between">
              <div className="max-lg:pb-10">
                <div className="flex justify-between max-lg:pt-12 max-lg:pb-8 lg:py-12">
                  <div>
                    <p className="text-[#f4fafa]">Tip Amount</p>
                    <p className="text-[#7f9c9f] text-sm">/ person</p>
                  </div>
                  <div>
                    {
                      tipOnlyAmount ? <p className="spaceMonoB text-[#26c0ab] text-3xl lg:text-[46px] lineH">${tipOnlyAmount}</p> : <p className="text-[#26c0ab] spaceMonoB text-3xl lg:text-[46px] lineH">$0.00</p>
                    }
                  </div>
                </div>

                <div className="flex justify-between">
                  <div>
                    <p className="text-[#f4fafa]">Total</p>
                    <p className="text-[#7f9c9f] text-sm">/ person</p>
                  </div>
                  <div>
                    {
                      totalPerPerson ? <p className="spaceMonoB text-[#26c0ab] text-3xl lg:text-[46px] lineH">${totalPerPerson}</p> : <p className="text-[#26c0ab] spaceMonoB text-3xl lg:text-[46px] lineH">$0.00</p>
                    }
                  </div>
                </div>
              </div>

              <div className="flex justify-center max-lg:-mb-4">
                {
                  bill !== "" || tipP !== "" || peeps !== "" || custTipP !== "" ? <button className="hober bg-[#26c0ab] h-12 rounded-md text-xl pt-[2px] mb-10 text-[#00494d] w-full spaceMonoB" onClick={() => resetValues()}>RESET</button> : <button disabled className="bg-[#29686d] h-12 rounded-md text-xl pt-[2px] mb-10 text-[#245d62] w-full spaceMonoB" onClick={() => resetValues()}>RESET</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
