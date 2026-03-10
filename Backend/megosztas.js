const{Tunnel}=require("cloudflared");
const fs=require("fs");
async function Megosztas(local) {
  const tunnel = Tunnel.quick(local);

  const url = new Promise((resolve) => tunnel.once("url", resolve));
  const link=await url;
  fs.writeFileSync("../historiaweb-mobilapp/services/url.json",`{"url":"${link}"}`);
  console.log("LINK:", await url);
}

module.exports={Megosztas};