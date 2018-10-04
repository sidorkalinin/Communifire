import { MbscControlBase, EventEmitter, ElementRef, NgZone, NgControl, MbscInputService } from './frameworks/angular';
import './presets/rating';
import { MbscScrollerOptions } from './core/core';
export interface MbscRatingOptions extends MbscScrollerOptions {
    defaultValue?: number;
    icon?: {
        filled: string;
        empty?: string;
    };
    inputClass?: string;
    invalid?: Array<any>;
    label?: string;
    order?: 'desc' | 'asc';
    placeholder?: string;
    showText?: boolean;
    style?: 'star' | 'grade';
    values?: number | Array<string | number> | {};
}
export declare class MbscRating extends MbscControlBase {
    options: MbscRatingOptions;
    value: string;
    onChangeEmitter: EventEmitter<string>;
    constructor(initialElement: ElementRef, zone: NgZone, control: NgControl, inputService: MbscInputService);
    setNewValue(v: string): void;
    ngAfterViewInit(): void;
}
