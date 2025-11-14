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

export class AddressImpl implements Address {
  constructor(
    public street: string,
    public houseNumber: string,
    public postalCode: string,
    public city: string,
    public country: string
  ) {}
}

export class UserImpl implements User {
  constructor(
    public id: number,
    public name: string,
    public address: AddressImpl | undefined = undefined,
    public email: string = "",
    public telephone: string = ""
  ) {}
}