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
export class AddressImpl implements Address{
  constructor(
    public street: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public country: string
  ){}
}
export class UserImpl implements User {
  constructor(
    public id: number,
    public name: string,
    public address: Address,
    public email: string,
    public telephone: string
    ){}
}