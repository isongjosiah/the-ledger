import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/interfaces/userRepo";

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export class CreateUser {
  constructor(private userRepo: IUserRepository) {}
  async execute(data: CreateUserDTO): Promise<User> {
    // validate if the user already exists
    let existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      // the user exists
      throw new Error("User Already Exists");
    }
    const user = new User(
      "",
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
    );
    return await this.userRepo.create(user);
  }
}
