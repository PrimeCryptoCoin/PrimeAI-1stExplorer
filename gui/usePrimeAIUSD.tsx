import * as React from "react";
import axios from "axios";

export function usePrimeAIUSD() {
  const [usdRate, setUsdRate] = React.useState<null | number>(null);

  React.useEffect(() => {
    async function work() {
      const URL = "https://api.xeggex.com/api/v2/ticker/PrimeAI_USDT";
      const response = await axios.get(URL);
      const value = parseFloat(response.data.last_price);
      setUsdRate(value);
    }
    work();
  });
  return usdRate;
}
