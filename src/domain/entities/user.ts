export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone?: string,
    public createdAt?: Date,
    public updatedAt?:Date
  ){
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
  }
}
