export interface Logger {
  sucess: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
}
