import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CartedProducts } from '../../cartedProducts/';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @OneToMany(() => CartedProducts, (cartedProduct) => cartedProduct.user)
  cartedProducts: CartedProducts;
}
