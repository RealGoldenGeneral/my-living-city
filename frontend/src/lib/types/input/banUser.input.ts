export interface IBanUserInput {
    userId: string;
    banUntil: number;
    banReason: string;
    banMessage: string;
    isWarning: boolean;
}
