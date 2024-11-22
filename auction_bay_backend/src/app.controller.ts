import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // test
    const ENV = process.env.NODE_ENV;
    const BASE_URL = process.env.BASE_URL;
    console.log("\nENV:", ENV, "\nBASE_URL:", BASE_URL);


    return this.appService.getHello();
  }
}
