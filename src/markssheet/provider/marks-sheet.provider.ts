import { Connection } from 'mongoose';
import { MarksSheetSchema } from '../schema/marks-sheet.schema';

export const marksSheetProviders = [
  {
    provide: 'MARKSSHEET_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('MarksSheet', MarksSheetSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
