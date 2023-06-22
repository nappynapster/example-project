import { RoleEnum } from '../../api/users/interfaces/user.interface';
import { JwtPayload } from 'jwt-decode';

export interface JwtPayloadInterface extends JwtPayload{
  role: RoleEnum
}
