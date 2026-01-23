import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */ reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withFlowbiteReact(nextConfig);
