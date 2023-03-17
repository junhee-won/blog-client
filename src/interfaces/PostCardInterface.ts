interface CategoryTree {
  id: number;
  name: string;
}

export interface PostCardInterface {
  id: number;
  title: string;
  created_at: string;
  categoryTree: CategoryTree[];
  thumbnail: string;
}
