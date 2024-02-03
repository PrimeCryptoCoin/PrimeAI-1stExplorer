import React from "react";
import axios from "axios";

export interface IConfig {
  baseCurrency: string
  primeai_password: string
  primeai_username: string
  primeai_url: string
  httpPort: number
  headline: string
  theme: string
  ipfs_gateway: string
}

export function useConfig():IConfig | null {
  const [config, setConfig] = React.useState(null);

  React.useEffect(() => {
    axios.get("/gui-settings").then((response) => {
      setConfig(response.data);
    });
  }, []);

  return config;
}
