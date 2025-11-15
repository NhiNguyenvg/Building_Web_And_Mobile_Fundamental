export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}
export interface User {
    id: number;
    name: string;
    address: Address;
    email: string;
    telephone: string;
}
export declare const exampleUser: User;
//# sourceMappingURL=user.d.ts.map