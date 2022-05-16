export class QueryDto<T> {
    Page: Page;
    Order: Order;
    Filter: Filter;
    Filters: Filter[];
    Results: T[];

    constructor() {
        this.Page = new Page();
        this.Order = new Order();
        this.Filter = new Filter();
        this.Filters = [];
        this.Results = [];
    }
}

export class Page {
    TotalRecordsQuantity: number;
    PageNumber: number;
    Top: number;

    constructor() {
        this.TotalRecordsQuantity = 0;
        this.PageNumber = 0;
        this.Top = 5;
    }
}

export class Order {
    By: string;
    Direction: Direction;

    constructor() {
        this.By = "Id";
        this.Direction = Direction.None;
    }
}

export enum Direction {
    None,
    Ascending,
    Descending,
}

export class Filter {
    By: string;
    Value: string;

    constructor() {
        this.By = null;
        this.Value = null;
    }
}
