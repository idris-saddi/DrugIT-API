import { UseGuards, Controller, Post } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('')
export class AuthController {
  // ...Read Note in the LocalStrategy for json format... //
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login() {}
}
