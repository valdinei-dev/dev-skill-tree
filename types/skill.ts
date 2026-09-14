export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Skill = {
  id: string;
  name: string;
  description: string;
  priority: SkillLevel;
  knowledge: SkillLevel;
  notes: string;
};
