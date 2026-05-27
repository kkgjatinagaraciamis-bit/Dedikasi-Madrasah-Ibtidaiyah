export interface Menu {
  id: string;
  title: string;
  icon: string;
  content: string;
  reloadUrl?: string;
  isActive: boolean;
  order: number;
}
