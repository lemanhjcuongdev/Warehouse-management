import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { GoodsTypes } from './GoodsTypes'

@Entity('goods_groups', { schema: 'quanlykho' })
export class GoodsGroups {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_goods_groups' })
  idGoodsGroups: number

  @Column('varchar', { name: 'name', nullable: true, length: 45 })
  name: string | null

  @OneToMany(() => GoodsTypes, (goodsTypes) => goodsTypes.idGoodsGroup2)
  goodsTypes: GoodsTypes[]
}
