export interface Order {
    id: string,
    timestamp: string,
    status: OrderStatus
}

export enum OrderStatus {
    Unknown = 0,

    Draft = 1,

    Placed = 2,

    Expired = 3,

    Declined = 4,

    Accepted = 5,

    Produced = 6,

    PickedUp = 7,

    Delivered = 8
}