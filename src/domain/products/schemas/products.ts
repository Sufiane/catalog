import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Categories } from '../../categories';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  price: number;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string | null;

  @Column({ name: 'visible_public' })
  visiblePublic: boolean;

  @Column({ name: 'visible_authenticated' })
  visibleAuthenticated: boolean;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;
}
