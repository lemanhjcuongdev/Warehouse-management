import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Goods } from './Goods'

@Entity('goods_units', { schema: 'quanlykho' })
export class GoodsUnits {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_goods_units' })
  idGoodsUnits: number

  @Column('varchar', { name: 'name', length: 45 })
  name: string

  @DeleteDateColumn({
    type: 'datetime',
    name: 'deleted_at'
  })
  deletedAt: Date

  @OneToMany(() => Goods, (goods) => goods.idUnits2)
  goods: Goods[]
}
