import {Component, Inject} from '@angular/core';
//import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {FormGroup, FormBuilder, Validators, FormControl, ValidatorFn} from '@angular/forms';
import {isEqual, omit} from 'lodash';
import {SweetAlert2Helper} from 'app/helpers/sweet-alert-2.helper';
import {BaseTableColumn, Type} from '../base-table/base-table-column';
import {KeyValue} from '@angular/common';

export interface DialogData {
    titleTranslationCode: string;
    action: string;
    columns: { [key: string]: BaseTableColumn };
    row: any;
}

@Component({
    selector: 'base-dialog',
    templateUrl: 'base-dialog.component.html',
    styleUrls: ['base-dialog.component.scss']
})
export class BaseDialogComponent {

    dialogForm: FormGroup;
    title: string;
    action: string;
    columns: { [key: string]: BaseTableColumn };
    row: any;
    rowCopy: any;
    type = Type;
    saveCallback: (any) => void;

    constructor(
        public _matDialogRef: MatDialogRef<BaseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _dialogData: DialogData,
        private _formBuilder: FormBuilder,
        private _sweetAlert2Helper: SweetAlert2Helper,
    ) {
        this.title = _dialogData.titleTranslationCode ? _dialogData.titleTranslationCode : 'COMMON.NOT_AVAILABLE';
        this.action = _dialogData.action ? _dialogData.action : 'add';
        this.columns = _dialogData.columns;
        this.row = JSON.parse(JSON.stringify(_dialogData.row));
        this.rowCopy = JSON.parse(JSON.stringify(this.row));
        this.dialogForm = this.createDialogForm();
        for (const key in this.columns) {
            if (this.row.hasOwnProperty(key)) {
                const validators = this.columns[key].validators ? this.columns[key].validators : [];
                this.addFormGroupControl(key, validators, this.row[key]);
            }
        }
        this.saveCallback = null;
    }

    createDialogForm(): FormGroup {
        const formGroup = this._formBuilder.group({
            id: [this.row.Id, [Validators.required]],
            registerDate: [this.row.registerDate, [Validators.required]],
            registerBy: [this.row.registerBy, [Validators.required, Validators.maxLength(128)]],
            updatedDate: [this.row.updatedDate, [Validators.required]],
            updatedBy: [this.row.updatedBy, [Validators.required, Validators.maxLength(128)]]
        });
        return formGroup;
    }

    sortByIndexAscending = (kv1: KeyValue<string, any>, kv2: KeyValue<string, any>): number => {
        const a = kv1.value.Index;
        const b = kv2.value.Index;
        return a > b ? 1 : (b > a ? -1 : 0);
    };

    addFormGroupControl(formGroupControlName: string, validators: ValidatorFn[], value?: any): void {
        if (!this.dialogForm) {
            return;
        }
        this.dialogForm.addControl(formGroupControlName, new FormControl(value ? value : '', validators));
    }

    removeFormGroupControl(formGroupControlName: string): void {
        if (!this.dialogForm) {
            return;
        }
        this.dialogForm.removeControl(formGroupControlName);
    }

    setRawValues(): void {
        const rawValue = this.dialogForm.getRawValue();
        for (const key in this.columns) {
            if (this.row.hasOwnProperty(key)) {
                this.row[key] = rawValue[key];
            }
        }
    }

    cancel(): void {
        this.setRawValues();
        const hasChanges = !isEqual(omit(this.row, ['__proto__']), omit(this.rowCopy, ['__proto__']));
        if (!hasChanges) {
            this._matDialogRef.close();
            return;
        }
        this._sweetAlert2Helper.question('Atención', '¿Descartar cambios?', 'Descartar', 'Cancelar', () => {
            this._matDialogRef.close();
        }, () => {
        });
    }

    save(): void {
        this.setRawValues();
        this.row.registerDate = this.action === 'edit' ? this.row.registerDate : new Date();
        this.row.updatedDate = new Date();
        if (this.saveCallback) {
            this.saveCallback(this.row);
        }
    }
}
