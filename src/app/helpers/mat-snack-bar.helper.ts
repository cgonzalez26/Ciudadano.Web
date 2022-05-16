import { Injectable } from "@angular/core";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable()
export class MatSnackBarHelper {
    private options: MatSnackBarOptions;

    constructor(private _matSnackBar: MatSnackBar) {
        this.options = new MatSnackBarOptions();
    }

    success(message: string) {
        this._matSnackBar.open(message, null, {
            duration: this.options.duration.short,
            horizontalPosition: this.options.horizontalPosition,
            verticalPosition: this.options.verticalPosition,
            panelClass: this.options.successPanelClass,
        });
    }

    error(message: string) {
        this._matSnackBar.open(message, null, {
            duration: this.options.duration.short,
            horizontalPosition: this.options.horizontalPosition,
            verticalPosition: this.options.verticalPosition,
            panelClass: this.options.errorPanelClass,
        });
    }

    warning(message: string) {
        this._matSnackBar.open(message, null, {
            duration: this.options.duration.short,
            horizontalPosition: this.options.horizontalPosition,
            verticalPosition: this.options.verticalPosition,
            panelClass: this.options.warningPanelClass,
        });
    }

    info(message: string) {
        this._matSnackBar.open(message, null, {
            duration: this.options.duration.short,
            horizontalPosition: this.options.horizontalPosition,
            verticalPosition: this.options.verticalPosition,
            panelClass: this.options.infoPanelClass,
        });
    }
}

class MatSnackBarOptions {
    duration: Duration;
    horizontalPosition: MatSnackBarHorizontalPosition;
    verticalPosition: MatSnackBarVerticalPosition;
    successPanelClass: string | string[];
    errorPanelClass: string | string[];
    warningPanelClass: string | string[];
    infoPanelClass: string | string[];

    constructor() {
        this.duration = {
            short: 3000,
            long: 5000,
        };
        this.horizontalPosition = "center";
        this.verticalPosition = "bottom";
        this.successPanelClass = "bw-mat-snack-bar-bg-success";
        this.errorPanelClass = "bw-mat-snack-bar-bg-error";
        this.warningPanelClass = "bw-mat-snack-bar-bg-warning";
        this.infoPanelClass = "bw-mat-snack-bar-bg-info";
    }
}

class Duration {
    short: number;
    long: number;
}
