import {ValidatorFn} from '@angular/forms';

export class BaseTableColumn {
    index: number;
    name?: string;
    type?: Type;
    translationCode?: string;
    flexGrow?: number;
    sortable?: boolean;
    validators?: ValidatorFn[];

    constructor() {
        this.index = 0;
        this.name = '';
        this.type = Type.SINGLE_LINE_STRING;
        this.translationCode = '';
        this.flexGrow = 1;
        this.sortable = true;
        this.validators = [];
    }
}

export enum Type {
    SINGLE_LINE_STRING,
    MULTIPLE_LINE_STRING,
    NUMBER,
    DATE,
    BOOLEAN,
    ARRAY,
}