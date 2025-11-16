export interface Address {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
}
export interface User {
    id: number;
    name: string;
    address?: Address;
    email: string;
    telephone: string;
}
export declare class AddressImpl implements Address {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
    constructor(street: string, houseNumber: string, postalCode: string, city: string, country: string);
}
export declare class UserImpl implements User {
    id: number;
    name: string;
    address: AddressImpl | undefined;
    email: string;
    telephone: string;
    constructor(id: number, name: string, address?: AddressImpl | undefined, email?: string, telephone?: string);
}
export declare function loadUsers(): Promise<UserImpl[]>;
