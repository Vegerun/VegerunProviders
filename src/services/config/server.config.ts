const Host = 'http://localhost:5000'
export const ApiRoot = `${Host}/api/v1`

export const ApiTokenUri = `${ApiRoot}/token`;


// export class ActionDescriptor {
//     public ApiPathTemplate: string;
//     public FirebasePathTemplate: string;

//     constructor(apiPathTemplate: string, firebasePathTemplate: string = null) {
//         this.ApiPathTemplate = apiPathTemplate;
//         this.FirebasePathTemplate = firebasePathTemplate;
//     }
// }

// export class ApiDescriptor<T> {

// }

// export class FribaseDescriptor<T> {
    // MaxAge
// }

// export const ApiDescriptors = {
//     ListMenuItems: new ActionDescriptor("/menus/list-items/:restaurantId"),
//     EnableMenuItem: new ActionDescriptor("/menus/enable-item/:id"),
//     DisableMenuItem: new ActionDescriptor("/menus/disable-item:id"),

//     ListActiveOrders: new ActionDescriptor("/orders/list-active-v2", "/restaurant-orders/{:restaurantId}"),
// };

// export const Actions: ActionDescriptor[] = [

// ];  