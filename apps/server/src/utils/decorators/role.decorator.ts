import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/entities";
/**
 * Decorator to set required user role as meta data
 */
export const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles);
