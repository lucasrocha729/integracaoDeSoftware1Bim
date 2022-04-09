import { Property } from 'objectypes';

export class Character {
  @Property({ name: 'name', nullable: true })
  name: string;

  @Property({ name: 'class', nullable: true })
  class: string;

  @Property({ name: 'active_spec_name', nullable: true })
  activeSpecName: string;

  @Property({ name: 'active_spec_role', nullable: true })
  activeSpecRole: string;

  @Property({ name: 'faction', nullable: true })
  faction: string;

  @Property({ name: 'region', nullable: true })
  region: string;

  @Property({ name: 'gear.item_level_equipped', nullable: true })
  itemLevelEquipped: number;
}
