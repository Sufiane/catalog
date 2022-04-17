import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Products } from '../../products';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: number;

  @Column()
  label: string;

  @Column({ length: 255 })
  description: string;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}
