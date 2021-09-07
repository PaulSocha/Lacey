import { SlotConfirmationStatus } from 'ask-sdk-model';

export interface UnmatchedSlotValue {
    name: string;
    value: string;
    resolved: string;
    isMatch: boolean;
    confirmationStatus: SlotConfirmationStatus;
}