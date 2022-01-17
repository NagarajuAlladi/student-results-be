import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { authProviders } from 'src/auth/provider/auth.provider';
import { CaslModule } from 'src/casl/casl.module';
import { DatabaseModule } from 'src/database/database.module';
import { MarkssheetController } from './markssheet.controller';
import { MarkssheetService } from './markssheet.service';
import { marksSheetProviders } from './provider/marks-sheet.provider';

@Module({
  imports: [DatabaseModule, AuthModule, CaslModule],
  controllers: [MarkssheetController],
  providers: [MarkssheetService, ...marksSheetProviders, ...authProviders],
})
export class MarkssheetModule {}
