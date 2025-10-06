import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { CreateUserData, UpdateUserData } from '../../models/user.model';

export class UserServiceMapper {
  static toCreateUserData(createUserDto: CreateUserDto): CreateUserData {
    return {
      email: createUserDto.email,
      name: createUserDto.name,
      isActive: createUserDto.isActive,
    };
  }

  static toUpdateUserData(updateUserDto: UpdateUserDto): UpdateUserData {
    return {
      email: updateUserDto.email,
      name: updateUserDto.name,
      isActive: updateUserDto.isActive,
    };
  }
}
