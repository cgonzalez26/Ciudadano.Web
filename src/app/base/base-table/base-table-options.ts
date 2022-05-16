export class BaseTableOptions {
    Limit: number;
    DefaultColumns: any;
    DefaultActions: any;

    constructor() {
        this.Limit = 10;
        this.DefaultColumns = {
            id: {
                Show: false,
                FlexGrow: 1,
                Sortable: false,
            },
            registerDate: {
                Show: false,
                FlexGrow: 1,
                Sortable: true,
            },
            registerBy: {
                Show: false,
                FlexGrow: 1,
                Sortable: true,
            },
            updatedDate: {
                Show: false,
                FlexGrow: 1,
                Sortable: true,
            },
            updatedBy: {
                Show: false,
                FlexGrow: 1,
                Sortable: true,
            },
            deletedDate: {
                Show: false,
                FlexGrow: 1,
                Sortable: true,
            },
            deletedBy: {
                Show: false,
                FlexGrow: 1,
                Sortable: true,
            },
            isDeleted: {
                Show: false,
                FlexGrow: 1,
                Sortable: false,
            },
        };
        this.DefaultActions = {
            FlexGrow: 1,
            Add: {
                Show: true,
                RequestPermission: true,
                Permission: 'YOUR_PERMISSION',
            },
            Edit: {
                Show: true,
                RequestPermission: true,
                Permission: 'YOUR_PERMISSION',
            },
            Delete: {
                Show: true,
                RequestPermission: true,
                Permission: 'YOUR_PERMISSION',
            },
        };
    }
}