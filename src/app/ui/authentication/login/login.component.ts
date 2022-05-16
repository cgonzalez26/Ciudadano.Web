import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";

import { locale as english } from "./i18n/en";
import { locale as spanish } from "./i18n/es";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import { Router } from "@angular/router";
import { NgxPermissionsService } from "ngx-permissions";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading: boolean;
    hasError: boolean;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _authenticationService: AuthenticationService,
        private _router: Router,
        private _ngxPermissionsService: NgxPermissionsService,
        private _translate: TranslateService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
        this.isLoading = false;
        this.hasError = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            // email: ['', [Validators.required, Validators.email]],
            userName: ["", [Validators.required]],
            password: ["", Validators.required],
        });
    }

    public login() {
        const userName = this.loginForm.get("userName").value;
        const password = this.loginForm.get("password").value;
        if (userName && password) {
            this.isLoading = true;
            this.hasError = false;
            this._authenticationService.login(userName, password).subscribe(
                (response) => {
                    console.log("LoginComponent > login > response", response);
                    if (response) {
                        this._authenticationService.getPermisos().subscribe(
                            (response) => {
                                this.isLoading = false;
                                let permisos = response;
                                console.log(
                                    "LoginComponent > login > permisos",
                                    permisos
                                );
                                this._ngxPermissionsService.loadPermissions(
                                    permisos
                                );

                                let userLanguage = this._authenticationService.getLenguaje();
                                this._translate.use(
                                    userLanguage && userLanguage.match(/es|en/)
                                        ? userLanguage
                                        : "es"
                                );

                                this._router.navigateByUrl("");
                            },
                            (error) => {
                                console.error(
                                    "LoginComponent > login > response",
                                    error
                                );
                                this._authenticationService.logout();
                                this.isLoading = false;
                                this.hasError = true;
                            }
                        );
                    } else {
                        this.isLoading = false;
                        this.hasError = true;
                    }
                },
                (error) => {
                    console.log("LoginComponent > login > error", error);
                    this.isLoading = false;
                    this.hasError = true;
                }
            );
        }
    }
}
