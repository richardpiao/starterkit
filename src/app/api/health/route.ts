import { NextResponse } from "next/server";

interface IHealthResponse {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime: number;
  version: string;
}

export function GET(): NextResponse<IHealthResponse> {
  const healthCheck: IHealthResponse = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env["npm_package_version"] ?? "0.0.0",
  };

  return NextResponse.json(healthCheck, { status: 200 });
}
