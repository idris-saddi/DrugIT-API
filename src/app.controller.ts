import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
   * This method should check credentials and
   * check if user is authorized or not
   */
  @Get()
  IsAuthorized(): String {
    return this.appService.IsAuthorized();
  }

}
