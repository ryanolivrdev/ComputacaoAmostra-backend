import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/decorators/guards/auth.decorator';
import { SessionGuard } from 'src/common/decorators/guards/session.decorator';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@UseGuards(SessionGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(new AuthGuard('DEV'))
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    try {
      return this.projectsService.create(createProjectDto);
    } catch (error) {
      return { error };
    }
  }

  @UseGuards(new AuthGuard('CLIENT'))
  @Get()
  findAll(@Query('filter', ParseFilterPipe) filterType: string) {
    try {
      return this.projectsService.findAll(filterType);
    } catch (error) {
      return { error };
    }
  }

  @UseGuards(new AuthGuard('CLIENT'))
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.projectsService.findOne(id);
    } catch (error) {
      return { error };
    }
  }

  @UseGuards(new AuthGuard('DEV'))
  @Delete('/status/:id')
  changeStatus(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.projectsService.changeStatus(id);
    } catch (error) {
      return { error };
    }
  }
}
