import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from '../../products';
import { Users } from '../../users';

@Entity('carted_products')
export class CartedProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column('int', { name: 'quantity' })
  quantity: number;

  @ManyToOne(() => Users, (users) => users.cartedProducts)
  @JoinColumn({ name: 'user_id' })
  user?: Users;

  @ManyToOne(() => Products, (products) => products.carts)
  @JoinColumn({ name: 'product_id' })
  product?: Products;
}
