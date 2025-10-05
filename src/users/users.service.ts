import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User, CreateUserData, UpdateUserData } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Convert DTO to domain model
    const createUserData: CreateUserData = {
      email: createUserDto.email,
      name: createUserDto.name,
      isActive: createUserDto.isActive,
    };

    return this.usersRepository.create(createUserData);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if user exists
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if email is being updated and already exists
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.usersRepository.existsByEmail(
        updateUserDto.email,
      );
      if (emailExists) {
        throw new ConflictException('User with this email already exists');
      }
    }

    // Convert DTO to domain model
    const updateUserData: UpdateUserData = {
      email: updateUserDto.email,
      name: updateUserDto.name,
      isActive: updateUserDto.isActive,
    };

    return this.usersRepository.update(id, updateUserData);
  }

  async remove(id: number): Promise<User> {
    // Check if user exists
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Soft delete
    return this.usersRepository.softDelete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async getUserStats(): Promise<{ totalUsers: number }> {
    const totalUsers = await this.usersRepository.count();
    return { totalUsers };
  }
}
