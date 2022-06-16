import { Property } from 'objectypes';

export class GuildInfos {
  @Property({ nullable: true })
  name: string;

  @Property({ name: 'class', nullable: true })
  class: string;

  @Property({ name: 'guild.name', nullable: true })
  guildName: string;

  realm: string;
}
