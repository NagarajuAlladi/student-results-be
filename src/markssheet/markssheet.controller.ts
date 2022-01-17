import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Action } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factor';
import { CheckPolicies } from 'src/casl/decorator/check-policies.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CreateMarksSheetDto } from './dto/create-marks-sheet.dto';
import { UpdateMarksSheetDto } from './dto/update-marks-sheet.dto';
import { GetFilterDto } from './filters/get-filter.dto';
import { MarksSheet } from './interface/marks-sheet.interface';
import { MarkssheetService } from './markssheet.service';

@ApiTags('markssheet')
@Controller('markssheet')
export class MarkssheetController {
  constructor(private readonly marksSheetService: MarkssheetService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, MarksSheet),
  )
  @Post(':id')
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(
    @Param('id') id: string,
    @Body() createMarksSheetDto: CreateMarksSheetDto,
  ) {
    return this.marksSheetService.create(id, createMarksSheetDto);
  }

  @UseGuards(JwtAuthGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Get, MarksSheet))
  @Get()
  @ApiOkResponse({
    description: 'This resource list has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findOne(@Query('id') filterDto: GetFilterDto) {
    if (filterDto) {
      return this.marksSheetService.find(filterDto);
    } else {
      return this.marksSheetService.findAll();
    }
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, MarksSheet),
  )
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The resource has been updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Param('id') id: string,
    @Body() UpdateMarksSheetDto: UpdateMarksSheetDto,
  ) {
    return this.marksSheetService.update(id, UpdateMarksSheetDto);
  }

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Delete, MarksSheet),
  )
  @Delete(':id')
  @ApiOkResponse({ description: 'The resource has been successfully deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  remove(@Param('id') id: string) {
    return this.marksSheetService.remove(id);
  }
}
