import { logger } from './logger';

describe('Logger', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  const consoleError = jest.spyOn(console, 'error').mockImplementation();
  const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
  const consoleInfo = jest.spyOn(console, 'info').mockImplementation();

  beforeEach(() => {
    consoleSpy.mockClear();
    consoleError.mockClear();
    consoleWarn.mockClear();
    consoleInfo.mockClear();
  });

  it('should log info messages', () => {
    logger.info('Test info message', { key: 'value' });
    expect(consoleInfo).toHaveBeenCalled();
  });

  it('should log warning messages', () => {
    logger.warn('Test warning message', { key: 'value' });
    expect(consoleWarn).toHaveBeenCalled();
  });

  it('should log error messages', () => {
    const testError = new Error('Test error');
    logger.error('Test error message', testError, { key: 'value' });
    expect(consoleError).toHaveBeenCalled();
  });

  it('should include timestamp in logs', () => {
    logger.info('Test message');
    const callArgs = consoleInfo.mock.calls[0][0];
    expect(callArgs).toMatch(/\[\d{4}-\d{2}-\d{2}/); // ISO date format
  });

  it('should include log level in output', () => {
    logger.info('Test message');
    const callArgs = consoleInfo.mock.calls[0][0];
    expect(callArgs).toContain('[INFO]');
  });

  afterAll(() => {
    consoleSpy.mockRestore();
    consoleError.mockRestore();
    consoleWarn.mockRestore();
    consoleInfo.mockRestore();
  });
});
