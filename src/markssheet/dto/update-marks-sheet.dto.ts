import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMarksSheetDto } from './create-marks-sheet.dto';

export class UpdateMarksSheetDto extends PartialType(CreateMarksSheetDto) {
  @ApiProperty({
    type: Object,
    description: 'Full Marks in Practical',
    default: {
      English: '',
      Maths: '',
    },
  })
  fullMarksInPractical: {
    English: Number;
    Maths: Number;
  };
  @ApiProperty({
    type: Object,
    description: 'Obtained Marks in Practical',
    default: {
      English: '',
      Maths: '',
    },
  })
  obtainedMarksInPractical: {
    English: Number;
    Maths: Number;
  };

  @ApiProperty({
    type: Object,
    description: 'Full Marks in Theory',
    default: {
      English: '',
      Maths: '',
    },
  })
  fullMarksInTheory: {
    English: Number;
    Maths: Number;
  };

  @ApiProperty({
    type: Object,
    description: 'Obtained Marks in Theory',
    default: {
      English: '',
      Maths: '',
    },
  })
  obtainedMarksInTheory: {
    English: Number;
    Maths: Number;
  };
}
