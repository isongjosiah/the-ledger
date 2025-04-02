import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/interfaces/userRepo";
import { userModel } from "../models/user";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await userModel.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    });
    return new User(
      createdUser._id.toString(),
      createdUser.firstName,
      createdUser.lastName,
      createdUser.email,
      createdUser.phone,
      createdUser.createdAt,
      createdUser.updatedAt,
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await userModel.findById(id);
    if (!user) return null;

    return new User(
      user._id.toString(),
      user.firstName,
      user.lastName,
      user.email,
      user.phone,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await userModel.findOne({ email: email });
    if (!user) return null;
    return new User(
      user._id.toString(),
      user.firstName,
      user.lastName,
      user.email,
      user.phone,
      user.createdAt,
      user.updatedAt,
    );
  }
}
