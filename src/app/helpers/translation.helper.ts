import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class TranslationHelper {
    public loading: string;
    public noDataAvailable: string;
    public notAvailable: string;
    public name: string;
    public description: string;
    public ok: string;
    public saving: string;
    public savingChanges: string;
    public warningAttention: string;
    public accept: string;
    public cancel: string;
    public requestProcessedSuccessfully: string;

    constructor(private translateService: TranslateService) {
        this.translateService
            .get([
                "COMMON.LOADING",
                "COMMON.NO_DATA_AVAILABLE",
                "COMMON.NOT_AVAILABLE",
                "COMMON.FIELDS.NAME",
                "COMMON.FIELDS.DESCRIPTION",
                "COMMON.BUTTONS.OK",
                "COMMON.SAVING",
                "COMMON.SAVING_CHANGES",
                "COMMON.WARNINGS.ATTENTION",
                "COMMON.BUTTONS.ACCEPT",
                "COMMON.BUTTONS.CANCEL",
                "COMMON.MESSAGES.REQUEST_PROCESSED_SUCCESSFULLY",
            ])
            .subscribe((res) => {
                this.loading = res["COMMON.LOADING"];
                this.noDataAvailable = res["COMMON.NO_DATA_AVAILABLE"];
                this.notAvailable = res["COMMON.NOT_AVAILABLE"];
                this.name = res["COMMON.FIELDS.NAME"];
                this.description = res["COMMON.FIELDS.DESCRIPTION"];
                this.ok = res["COMMON.BUTTONS.OK"];
                this.saving = res["COMMON.SAVING"];
                this.savingChanges = res["COMMON.SAVING_CHANGES"];
                this.warningAttention = res["COMMON.WARNINGS.ATTENTION"];
                this.accept = res["COMMON.BUTTONS.ACCEPT"];
                this.cancel = res["COMMON.BUTTONS.CANCEL"];
                this.requestProcessedSuccessfully =
                    res["COMMON.MESSAGES.REQUEST_PROCESSED_SUCCESSFULLY"];
            });
    }

    public translate(key: string, value: string, callback?: any) {
        this.translateService
            .get(key, { value: value })
            .subscribe((res: string) => {
                if (callback) {
                    callback(res);
                }
            });
    }
}
