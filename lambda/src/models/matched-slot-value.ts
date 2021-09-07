import { SlotConfirmationStatus, slu } from 'ask-sdk-model';

export interface MatchedSlotValue {
    name: string;
    value: string;
    isMatch: boolean;
    resolved: string;
    id: string;
    isAmbiguous: boolean;
    values: slu.entityresolution.Value[];
    confirmationStatus: SlotConfirmationStatus;
}
