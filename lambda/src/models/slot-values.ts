import { MatchedSlotValue } from './matched-slot-value';
import { UnmatchedSlotValue } from './unmatched-slot-values';

export interface SlotValues {
    [key: string]: MatchedSlotValue | UnmatchedSlotValue | undefined;
}