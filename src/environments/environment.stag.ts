export const environment = {
    production: true,
    hmr: false,
    localStorageAuthDataItem: "ATIBaseWebLSStaging", // ACCIÓN NECESARIA: RENOMBRAR (EJ. ATICopaLecheWebLSStaging)
    api: {
        auth: "https://apiatiidentity-staging.azurewebsites.net/",
        base: "https://base-api-staging.azurewebsites.net/v1/", // ACCIÓN NECESARIA: CONFIGURAR LA URL DE LA API DE CALIDAD
    },
    google: {
        maps: {
            apiKey: "PUT_YOUR_GOOGLE_MAPS_API_KEY_HERE", // ACCIÓN OPCIONAL: CONFIGURAR LA API KEY PARA GOOGLE MAPS SI CORRESPONDE.
        },
    },
    scope: "base.api", // ACCIÓN REQUERIDA: CONFIGURAR "scope" PARA LA API CONFIGURADA EN "api.base" (EJ. copaleche.api, SOLICITAR A ALGUN ADMINISTRADOR)
    appCode: "COD_BASE_WEB", // ACCIÓN REQUERIDA: CONFIGURAR "appCode" PARA EL SISTEMA CORRESPONDIENTE (EJ. COD_COPADELECHE, SOLICITAR A ALGUN ADMINISTRADOR)
    appName: "ATI.Base.Web", // ACCIÓN OPCIONAL: CONFIGURAR NOMBRE DE LA APLICACIÓN
    appVersion: "1.0.0", // ACCIÓN OPCIONAL: CONFIGURAR VERSIÓN DE LA APLICACIÓN
    appVersionDate: "30/04/2021", // ACCIÓN OPCIONAL: CONFIGURAR FECHA DE LA APLICACIÓN
};
