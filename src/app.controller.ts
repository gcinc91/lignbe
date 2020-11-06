import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CoordinatesDTO, EnvironmentDTO } from './dto/dto';
import { EnvironmentPipe } from './dto/pipes';

@ApiTags('YVH')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('radar')
  @UsePipes(EnvironmentPipe)
  radar(@Body() environment: EnvironmentDTO): CoordinatesDTO {
    return this.appService.radar(environment);
  }
}
