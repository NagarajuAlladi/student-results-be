import * as mongoose from 'mongoose';
import { User } from 'src/auth/interface/user.interface';
const Schema = mongoose.Schema;

var PracticalFullMarks = new mongoose.Schema({
  English: {
    type: Number,
  },
  Maths: {
    type: Number,
  },
});
var ObtainedPracticalFullMarks = new mongoose.Schema({
  English: {
    type: Number,
  },
  Maths: {
    type: Number,
  },
});

var TheoryFullMarks = new mongoose.Schema({
  English: {
    type: Number,
  },
  Maths: {
    type: Number,
  },
});

var ObtainedTheoryFullMarks = new mongoose.Schema({
  English: {
    type: Number,
  },
  Maths: {
    type: Number,
  },
});

export const MarksSheetSchema = new mongoose.Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  fullMarksInPractical: PracticalFullMarks,
  obtainedMarksInPractical: ObtainedPracticalFullMarks,
  fullMarksInTheory: TheoryFullMarks,
  obtainedMarksInTheory: ObtainedTheoryFullMarks,
});
