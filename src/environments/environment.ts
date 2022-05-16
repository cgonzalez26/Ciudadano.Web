// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    localStorageAuthDataItem: "ATIBaseWebLSLocal", // ACCIÓN REQUERIDA: RENOMBRAR (EJ. ATICopaLecheWebLSLocal)
    localStorageEditItem: 'ATIBaseWebLSLocal',
    api: {
        //auth: "https://apiatiidentity-staging.azurewebsites.net/",
        auth: "https://localhost:44301/",//"http://localhost:58425/",
        base: "https://localhost:44301/api/", // ACCIÓN REQUERIDA: CONFIGURAR LA URL DE LA API LOCAL
    },
    google: {
        maps: {
            apiKey: "PUT_YOUR_GOOGLE_MAPS_API_KEY_HERE", // ACCIÓN OPCIONAL: CONFIGURAR LA API KEY PARA GOOGLE MAPS SI CORRESPONDE.
        },
    },
    scope: "testbase.api", // ACCIÓN REQUERIDA: CONFIGURAR "scope" PARA LA API CONFIGURADA EN "api.base" (EJ. copaleche.api, SOLICITAR A ALGUN ADMINISTRADOR)
    appCode: "COD_BASE_WEB", // ACCIÓN REQUERIDA: CONFIGURAR "appCode" PARA EL SISTEMA CORRESPONDIENTE (EJ. COD_COPADELECHE, SOLICITAR A ALGUN ADMINISTRADOR)
    appName: "ATI.Base.Web", // ACCIÓN OPCIONAL: CONFIGURAR NOMBRE DE LA APLICACIÓN
    appVersion: "1.0.0", // ACCIÓN OPCIONAL: CONFIGURAR VERSIÓN DE LA APLICACIÓN
    appVersionDate: "16/07/2021", // ACCIÓN OPCIONAL: CONFIGURAR FECHA DE LA APLICACIÓN
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
