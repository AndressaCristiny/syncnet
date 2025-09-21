import OZMapSDK from "@ozmap/ozmap-sdk";

const sdk = new OZMapSDK(process.env.OZMAP_URL || "", {
  apiKey: process.env.OZMAP_API_KEY || "",
});

export default sdk;
