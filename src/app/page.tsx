import Image from "next/image";
import splitter from "@/app/assets/images/logo.svg"

export default function Home() {
  return (
    <div className="bg-[#c5e4e7]">
      <div className="flex justify-center pt-36 -mb-36">
        <img className="w-18 h-12" src={splitter.src} alt="" />
      </div>

      <div className="min-h-screen grid place-items-center">
        <div className="bg-white w-8/12 h-3/6 rounded-[30px] grid grid-cols-2">
          <div className="my-10 mr-4 ml-8">
            <p>Bill</p>
            <input type="text" />

            <p>Select Tip %</p>
            <div className="grid grid-cols-3">
              <button>5%</button>
              <button>10%</button>
              <button>15%</button>
              <button>25%</button>
              <button>50%</button>
              <button>Custom</button>
            </div>

            <div className="flex justify-between">
              <p>Number Of People</p>
              <p>Can't be zero</p>
            </div>
            <input type="text" />
          </div>

          <div className="bg-[#00494d] my-10 ml-4 mr-8">
            <div className="flex justify-between">
              <div>
                <p>Tip Amount</p>
                <p>/ person</p>
              </div>
              <div>
                <p>$0.00</p>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <p>Tip Amount</p>
                <p>/ person</p>
              </div>
              <div>
                <p>$0.00</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

  );
}
