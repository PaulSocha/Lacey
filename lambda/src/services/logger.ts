export interface Logger {
    log(...args: any[]): void;
}

export class ConsoleLogger implements Logger {
    public log(...args: any[]): void {
        console.log.apply(console, [args]);
    }
}
