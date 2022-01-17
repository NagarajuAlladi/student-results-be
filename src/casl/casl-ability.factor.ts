import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/interface/user.interface';
import { MarksSheet } from 'src/markssheet/interface/marks-sheet.interface';
import { Action } from './action.enum';

type Subjects = InferSubjects<typeof MarksSheet>;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isTeacher) {
      // can(Action.Get, 'all');
      // can(Action.Create, 'all');
      // can(Action.Delete, 'all');
      can(Action.Manage, MarksSheet);
      // can(Action.Get, Cat);
    } else {
      can(Action.Get, MarksSheet);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
