import * as React from "react";
import { Spacer } from "@nextui-org/react";
import { MyCard } from "../MyCard";
import { IBalanceProps, formatNumber } from "./Address";

export function Balance({ balance, baseCurrency, primeaiUsdRate }: IBalanceProps) {
  const balanceAmount = balance / 100000000;
  if (baseCurrency === "PrimeAI" && primeaiUsdRate) {
    const primeai = (
      <MyCard header="PrimeAI" body={formatNumber(balanceAmount)}></MyCard>
    );
    const usd = (
      <MyCard
        header="USD"
        body={formatNumber(balanceAmount * primeaiUsdRate)}
      ></MyCard>
    );
    const tutti = (
      <div>
        {primeai}
        <Spacer />
        {usd}
      </div>
    );

    return <MyCard header="Balance" body={tutti} />;
  }

  return <MyCard header="Balance" body={formatNumber(balanceAmount)}></MyCard>;
}
