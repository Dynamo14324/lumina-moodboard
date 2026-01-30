/**
 * Lumina Production Error & Analytics Logger
 * Centralized utility for monitoring, logging, and safeguards.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'fatal';

interface LogPayload {
  message: string;
  level: LogLevel;
  context?: Record<string, unknown>;
  error?: Error;
  timestamp: string;
}

class LuminaLogger {
  private static instance: LuminaLogger;
  private isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  public static getInstance(): LuminaLogger {
    if (!LuminaLogger.instance) {
      LuminaLogger.instance = new LuminaLogger();
    }
    return LuminaLogger.instance;
  }

  private formatLog(payload: LogPayload): string {
    return `[${payload.timestamp}] [${payload.level.toUpperCase()}] ${payload.message}`;
  }

  private async persistLog(payload: LogPayload) {
    if (this.isDevelopment) {
      const color = payload.level === 'error' ? '\x1b[31m' : '\x1b[32m';
      console.log(`${color}${this.formatLog(payload)}\x1b[0m`, payload.context || '');
      if (payload.error) console.error(payload.error);
      return;
    }

    // In Production, this would send to Sentry, LogRocket, or a custom /api/log endpoint
    try {
      // Placeholder for production logging integration
      // fetch('/api/log', { method: 'POST', body: JSON.stringify(payload) });
      console.log(this.formatLog(payload));
    } catch {
      // Fail silently to not crash the app
    }
  }

  public info(message: string, context?: Record<string, unknown>) {
    this.persistLog({
      message,
      level: 'info',
      context,
      timestamp: new Date().toISOString()
    });
  }

  public warn(message: string, context?: Record<string, unknown>) {
    this.persistLog({
      message,
      level: 'warn',
      context,
      timestamp: new Date().toISOString()
    });
  }

  public error(message: string, error?: Error, context?: Record<string, unknown>) {
    this.persistLog({
      message,
      level: 'error',
      error,
      context,
      timestamp: new Date().toISOString()
    });
  }

  public event(name: string, properties?: Record<string, unknown>) {
    // Analytics tracking (Vercel Analytics already integrated, but this adds a custom layer)
    this.info(`Event: ${name}`, properties);
  }
}

export const logger = LuminaLogger.getInstance();
