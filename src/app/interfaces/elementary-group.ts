export interface ElementaryGroup {
  id: number;
  code: string;
  name: string;
  parentGroup: ElementaryGroup;
  synthesis: string;
  tasks: string;
}
