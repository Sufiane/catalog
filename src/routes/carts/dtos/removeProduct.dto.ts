import { IsNumber } from 'class-validator';

export class RemoveProductDto {
  @IsNumber()
  productId: number;
}
