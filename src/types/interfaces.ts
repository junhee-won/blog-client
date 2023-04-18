export interface CategoryInterface {
  id: number;
  name: string;
  children: {
    id: number;
    name: string;
  }[];
}

export interface Category {
  id?: number;
  name?: string;
  description?: string;
  thumbnail?: string;
  public?: number;
  priority?: number;
  created_at?: string;
  updated_at?: string;
  parent_category_id?: number;
}

export interface Post {
  id: number;
  category_id: number;
  title: string;
  content: string;
  public: number;
  created_at: string;
  updated_at: string;
  thumbnail: string;
}

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

export interface VisitorCount {
  localeDateString: string;
  count: number;
}
