import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserDto } from "@reactive-resume/dto";

@Injectable()
export class OptionalGuard extends AuthGuard("two-factor") {
  handleRequest<TUser = UserDto>(error: Error, user: TUser): TUser {
    // Return user even if there's an error (for guest access)
    return user;
  }
}
