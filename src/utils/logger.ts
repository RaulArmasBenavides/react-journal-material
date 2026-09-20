type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  error?: Error;
}

declare global {
  namespace ImportMeta {
    interface ImportMeta {
      env: {
        DEV: boolean;
        PROD: boolean;
      };
    }
  }
}

class Logger {
  private readonly isDevelopment: boolean = (import.meta.env as any).DEV ?? false;

  private log(level: LogLevel, message: string, data?: any, error?: Error): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(data && { data }),
      ...(error && { error })
    };

    const logMessage = this.formatLog(entry);

    // Console output
    const consoleMethod = this.getConsoleMethod(level);
    consoleMethod(logMessage, error?.stack || '');

    // In production, you could send to a monitoring service
    if (!this.isDevelopment) {
      this.sendToMonitoring(entry);
    }
  }

  error(message: string, error?: Error, data?: any): void {
    this.log('error', message, data, error);
  }

  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      this.log('debug', message, data);
    }
  }

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message } = entry;
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  private getConsoleMethod(level: LogLevel): (...args: any[]) => void {
    const methods = {
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug
    };
    return methods[level];
  }

  private sendToMonitoring(_entry: LogEntry): void {
    // TODO: Implement monitoring service integration
    // Examples: Sentry, LogRocket, DataDog, etc.
    // if (_entry.level === 'error') {
    //   Sentry.captureException(_entry.error || new Error(_entry.message));
    // }
  }
}

export const logger = new Logger();
