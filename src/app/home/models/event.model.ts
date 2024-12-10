export interface EventModel {
  id: string;
  type: string;
  amount: number;
  categoryId: string;
  date: string;
  description: string;
  userId: string;
}

export interface ExtendedEventModel extends Omit<EventModel, 'categoryId'> {
  category: EventCategoryModel;
}

export interface EventCategoryModel {
  id: string;
  name: string;
  capacity: number;
  userId: string;
}
