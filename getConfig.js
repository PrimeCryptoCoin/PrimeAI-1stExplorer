import fs from "fs";

const defaultConfig = {
  baseCurrency: "PrimeAI",
  primeai_password: "anonymous",
  primeai_username: "anonymous",
  primeai_url: "https://rpc-main.primeai.top/rpc",
  httpPort: 8888,
  headline: "PrimeAI Mainnet",
  theme: "dark",
  ipfs_gateway: "https://cloudflare-ipfs.com/ipfs/",
};
const PROMPT_USER_TO_UPDATE_MESSAGE =
  "Please update your ./config.json file with your info";
export default function getConfig() {
  createConfigIfNeeded();

  const text = Buffer.from(fs.readFileSync("./config.json"));
  const config = JSON.parse(text);
  validateConfig(config);

  return config;
}

function createConfigIfNeeded() {
  if (fs.existsSync("./config.json") === false) {
    const text = JSON.stringify(defaultConfig, null, 4);
    fs.writeFileSync("./config.json", text); 
  }
}

function validateConfig(config) {
  if (!config.primeai_password) {
    throw new Error(PROMPT_USER_TO_UPDATE_MESSAGE);
  }
}
