import { Module } from '@nestjs/common';
import { MarkssheetModule } from './markssheet/markssheet.module';

@Module({
  imports: [MarkssheetModule],
 
})
export class AppModule {}
