import { isDevelopment, isProduction } from "./env";

type LogLevel = "debug" | "info" | "warn" | "error";

interface ILogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

interface ILogger {
  debug: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  error: (message: string, data?: unknown) => void;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel = isDevelopment ? "debug" : "info";

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function formatLogEntry(entry: ILogEntry): string {
  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;

  if (entry.data !== undefined) {
    return `${prefix} ${entry.message} ${JSON.stringify(entry.data)}`;
  }

  return `${prefix} ${entry.message}`;
}

function createLogEntry(
  level: LogLevel,
  message: string,
  data?: unknown
): ILogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    data,
  };
}

function log(level: LogLevel, message: string, data?: unknown): void {
  if (!shouldLog(level)) {
    return;
  }

  const entry = createLogEntry(level, message, data);
  const formatted = formatLogEntry(entry);

  switch (level) {
    case "debug":
    case "info": {
      if (!isProduction) {
        // eslint-disable-next-line no-console
        console.log(formatted);
      }
      break;
    }
    case "warn": {
      console.warn(formatted);
      break;
    }
    case "error": {
      console.error(formatted);
      break;
    }
    default: {
      // Exhaustive check - this should never happen
      const _exhaustiveCheck: never = level;
      console.error("Unknown log level:", _exhaustiveCheck);
    }
  }
}

export const logger: ILogger = {
  debug: (message: string, data?: unknown) => {
    log("debug", message, data);
  },
  info: (message: string, data?: unknown) => {
    log("info", message, data);
  },
  warn: (message: string, data?: unknown) => {
    log("warn", message, data);
  },
  error: (message: string, data?: unknown) => {
    log("error", message, data);
  },
};

export type { LogLevel, ILogEntry, ILogger };
