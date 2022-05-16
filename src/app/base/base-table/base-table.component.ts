import { Component, Input, OnInit, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { TranslationService } from 'app/services/translation/translation.service';
import { BaseTableOptions } from './base-table-options';
import { FormControl } from '@angular/forms';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe, KeyValue } from '@angular/common';
import { BaseTableColumn, Type } from './base-table-column';
@Component({
    selector: 'base-table',
    templateUrl: 'base-table.component.html',
    styleUrls: ['base-table.component.scss']
})
export class BaseTableComponent implements OnInit, OnChanges, OnDestroy {

    @Input() columns: {[key: string]: BaseTableColumn};
    @Input() rows: any[];
    @Input() loading: boolean;
    @Input() baseTableOptions: BaseTableOptions;
    @Output() onAdd: EventEmitter<void>;
    @Output() onEdit: EventEmitter<any>;
    @Output() onDelete: EventEmitter<any>;
    messages = {
        emptyMessage: 'No se encontraron registros'
    };
    private _unsubscribeAll: Subject<any>;
    searchInput: FormControl;
    filteredRows: any[];
    type = Type;

    constructor(
        private _translationService: TranslationService,
        private _datePipe: DatePipe,
    ) {
        this.columns = {};
        this.rows = [];
        this.loading = false;
        this.baseTableOptions = new BaseTableOptions();
        this.onAdd = new EventEmitter<void>();
        this.onEdit = new EventEmitter<any>();
        this.onDelete = new EventEmitter<any>();
        this.messages.emptyMessage = this._translationService.noDataAvailable;
        this._unsubscribeAll = new Subject();
        this.searchInput = new FormControl('');
        this.searchInput.valueChanges
        .pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        )
        .subscribe(searchText => {
            this.search(searchText);
        });
        this.filteredRows = [];
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.searchInput.setValue('');
        this.filteredRows = this.rows;
        this.filteredRows = [...this.filteredRows];
    }

    ngOnDestroy() {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    sortByIndexAscending = (kv1: KeyValue<string, any>, kv2: KeyValue<string, any>): number => {
        const a = kv1.value.Index;
        const b = kv2.value.Index;
        return a > b ? 1 : (b > a ? -1 : 0);
    };

    search(value: string) {
        value = value.toLowerCase();
        this.filteredRows = this.rows.filter(r => {
            let found = (this.baseTableOptions.DefaultColumns.Id.Show && r.Id && r.Id.toLowerCase().includes(value)) ||
            (this.baseTableOptions.DefaultColumns.RegisterDate.Show && r.RegisterDate && this._datePipe.transform(r.RegisterDate, 'dd/MM/yyyy HH:mm').toLowerCase().includes(value)) ||
            (this.baseTableOptions.DefaultColumns.RegisterBy.Show && r.RegisterBy && r.RegisterBy.toLowerCase().includes(value)) ||
            (this.baseTableOptions.DefaultColumns.UpdatedDate.Show && r.UpdatedDate && this._datePipe.transform(r.UpdatedDate, 'dd/MM/yyyy HH:mm').toLowerCase().includes(value)) ||
            (this.baseTableOptions.DefaultColumns.UpdatedBy.Show && r.UpdatedBy && r.UpdatedBy.toLowerCase().includes(value)) ||
            (this.baseTableOptions.DefaultColumns.DeletedDate.Show && r.DeletedDate && this._datePipe.transform(r.DeletedDate, 'dd/MM/yyyy HH:mm').toLowerCase().includes(value)) ||
            (this.baseTableOptions.DefaultColumns.DeletedBy.Show && r.DeletedBy && r.DeletedBy.toLowerCase().includes(value));
            for (const key in this.columns) {
                found = found || (r[key] && r[key].toLowerCase().includes(value));
            }
            return found;
        });
    }

    add() {
        this.onAdd.emit();
    }

    edit(row) {
        this.onEdit.emit(row);
    }

    delete(row) {
        this.onDelete.emit(row);
    }
}
