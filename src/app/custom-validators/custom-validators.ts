import { AbstractControl, ValidatorFn } from '@angular/forms';

export function twoDigitValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const inputValue: string = control.value;
        const isValid: boolean = /^\d{2}$/.test(inputValue);
        return isValid ? null : { 'twoDigits': true };
    };
}
export function threeDigitValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const inputValue: string = control.value;
        const isValid: boolean = /^\d{3}$/.test(inputValue);
        return isValid ? null : { 'threeDigits': true };
    };
}
