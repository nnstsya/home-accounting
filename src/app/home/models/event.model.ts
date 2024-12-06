export interface EventModel {
  id: number;
  type: string;
  amount: number;
  categoryId: number;
  date: string;
  description: string;
  userId: number;
}

export interface ExtendedEventModel extends Omit<EventModel, 'categoryId'> {
  category: EventCategoryModel;
}

export interface EventCategoryModel {
  id: number;
  name: string;
  capacity: number;
  userId: number;
}
