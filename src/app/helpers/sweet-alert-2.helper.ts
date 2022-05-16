import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { TranslationHelper } from "./translation.helper";

@Injectable()
export class SweetAlert2Helper {
    private options: SweetAlert2Options;

    constructor(private _translationHelper: TranslationHelper) {
        this.options = new SweetAlert2Options();
    }

    public info(
        title: string,
        description: string,
        callback: any,
        waitConfirmation?: boolean
    ) {
        if (waitConfirmation) {
            Swal.fire({
                icon: "info",
                title: title,
                html: description,
                timer: this.options.timer.short,
                showConfirmButton: true,
                confirmButtonText: this._translationHelper.ok,
                confirmButtonColor: this.options.confirmButtonColor,
            }).then((result) => {
                if (result.value) {
                    if (callback) {
                        callback();
                    }
                }
            });
        } else {
            Swal.fire({
                icon: "info",
                title: title,
                html: description,
                timer: this.options.timer.short,
                showConfirmButton: false,
            }).then(() => {
                if (callback) {
                    callback();
                }
            });
        }
    }

    public success(
        title: string,
        description: string,
        callback: any,
        waitConfirmation?: boolean
    ) {
        if (waitConfirmation) {
            Swal.fire({
                icon: "success",
                title: title,
                html: description,
                timer: this.options.timer.short,
                showConfirmButton: true,
                confirmButtonText: this._translationHelper.ok,
                confirmButtonColor: this.options.confirmButtonColor,
            }).then((result) => {
                if (result.value) {
                    if (callback) {
                        callback();
                    }
                }
            });
        } else {
            Swal.fire({
                icon: "success",
                title: title,
                html: description,
                timer: this.options.timer.short,
                showConfirmButton: false,
            }).then(() => {
                if (callback) {
                    callback();
                }
            });
        }
    }

    public error(
        title: string,
        description: string,
        callback: any,
        waitConfirmation?: boolean
    ) {
        if (waitConfirmation) {
            Swal.fire({
                icon: "error",
                title: title,
                html: description,
                timer: this.options.timer.short,
                showConfirmButton: true,
                confirmButtonText: this._translationHelper.ok,
                confirmButtonColor: this.options.confirmButtonColor,
            }).then((result) => {
                if (result.value) {
                    if (callback) {
                        callback();
                    }
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: title,
                html: description,
                timer: this.options.timer.short,
                showConfirmButton: false,
            }).then(() => {
                if (callback) {
                    callback();
                }
            });
        }
    }

    public warning(
        title: string,
        description: string,
        callback: any,
        waitConfirmation?: boolean
    ) {
        if (waitConfirmation) {
            Swal.fire({
                icon: "warning",
                title: title,
                html: description,
                timer: this.options.timer.short,
                showConfirmButton: true,
                confirmButtonText: this._translationHelper.ok,
                confirmButtonColor: this.options.confirmButtonColor,
            }).then((result) => {
                if (result.value) {
                    if (callback) {
                        callback();
                    }
                }
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: title,
                html: description,
                timer: this.options.timer.short,
                showConfirmButton: false,
            }).then(() => {
                if (callback) {
                    callback();
                }
            });
        }
    }

    public question(
        title: string,
        description: string,
        confirmButtonText: string,
        cancelButtonText: string,
        confirmCallback: any,
        cancelCallback?: any
    ) {
        Swal.fire({
            icon: "question",
            title: title,
            html: description,
            showConfirmButton: true,
            confirmButtonText: confirmButtonText,
            confirmButtonColor: this.options.confirmButtonColor,
            showCancelButton: true,
            cancelButtonText: cancelButtonText,
            cancelButtonColor: this.options.cancelButtonColor,
        }).then((result) => {
            if (result.value) {
                if (confirmCallback) {
                    confirmCallback();
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (cancelCallback) {
                    cancelCallback();
                }
            }
        });
    }
}

class SweetAlert2Options {
    timer: Timer;
    confirmButtonColor: string;
    cancelButtonColor: string;

    constructor() {
        this.timer = {
            short: 3000,
            long: 5000,
        };
        this.confirmButtonColor = "#039BE5";
        this.cancelButtonColor = "#F44336";
    }
}

class Timer {
    short: number;
    long: number;
}
