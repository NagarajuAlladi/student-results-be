import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/auth/interface/user.interface';
import { CreateMarksSheetDto } from './dto/create-marks-sheet.dto';
import { UpdateMarksSheetDto } from './dto/update-marks-sheet.dto';
import { GetFilterDto } from './filters/get-filter.dto';
import { MarksSheet } from './interface/marks-sheet.interface';

@Injectable()
export class MarkssheetService {
  constructor(
    @Inject('MARKSSHEET_MODEL')
    private readonly marksSheetModel: Model<MarksSheet>,
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
  ) {}
  async create(
    id: string,
    createMarksSheetDto: CreateMarksSheetDto,
  ): Promise<MarksSheet> {
    try {
      const newMarksSheet = new this.marksSheetModel(createMarksSheetDto);
      newMarksSheet.studentId = id;
      await newMarksSheet.save();
      return newMarksSheet;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async findAll(): Promise<MarksSheet[]> {
    try {
      return this.marksSheetModel.find({});
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async find(filterDto: GetFilterDto): Promise<MarksSheet> {
    try {
      return this.marksSheetModel.findById({ _id: filterDto });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(
    id: string,
    updateMarksSheetDto: UpdateMarksSheetDto,
  ): Promise<MarksSheet> {
    try {
      return this.marksSheetModel.findByIdAndUpdate(
        { _id: id },
        updateMarksSheetDto,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async remove(id: string): Promise<MarksSheet> {
    try {
      return this.marksSheetModel.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
