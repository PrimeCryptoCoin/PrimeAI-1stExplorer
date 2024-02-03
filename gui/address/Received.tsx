import * as React from "react";
import { Spacer } from "@nextui-org/react";
import { MyCard } from "../MyCard";
import { IReceivedProps, formatNumber } from "./Address";

export function Received({
  baseCurrency,
  received,
  primeaiUsdRate,
}: IReceivedProps) {
  const receivedAmount = Math.abs(received / 100000000);
  if (baseCurrency !== "PrimeAI" || primeaiUsdRate === null) {
    <MyCard
      header="Total received"
      body={
        <div>
          {baseCurrency} {formatNumber(receivedAmount)}
        </div>
      }
    />;
  }

  let usdDisplay = <div></div>;
  if (primeaiUsdRate && baseCurrency === "PrimeAI") {
    usdDisplay = (
      <MyCard header={"USD"} body={formatNumber(receivedAmount * primeaiUsdRate)} />
    );
  }

  return (
    <MyCard
      header="Total received"
      body={
        <div>
          <MyCard header={baseCurrency} body={formatNumber(receivedAmount)} />
          <Spacer />
          {usdDisplay}
        </div>
      }
    />
  );
}
