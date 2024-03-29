import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DefectiveRecords } from './DefectiveRecords'
import { ExportOrderDetails } from './ExportOrderDetails'
import { ExportReceipts } from './ExportReceipts'
import { GoodsTypes } from './GoodsTypes'
import { GoodsUnits } from './GoodsUnits'
import { Warehouses } from './Warehouses'
import { ImportOrderDetails } from './ImportOrderDetails'
import { StocktakingDetails } from './StocktakingDetails'

@Index('FK_goods_type_idx', ['idType'], {})
@Index('FK_goods_unit_idx', ['idUnits'], {})
@Index('FK_goods_warehouse_idx', ['idWarehouse'], {})
@Entity('goods', { schema: 'quanlykho' })
export class Goods {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_goods' })
  idGoods: number

  @Column('int', { name: 'id_type' })
  idType: number

  @Column('int', { name: 'id_units' })
  idUnits: number

  @Column('int', { name: 'id_warehouse' })
  idWarehouse: number

  @Column('varchar', { name: 'name', length: 200 })
  name: string

  @Column('int', { name: 'floor' })
  floor: number

  @Column('int', { name: 'slot' })
  slot: number

  @Column('datetime', { name: 'import_date' })
  importDate: Date

  @Column('date', { name: 'exp' })
  exp: string

  @Column('int', { name: 'amount' })
  amount: number

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date | null

  @Column('int', { name: 'id_created' })
  idCreated: number

  @Column('int', { name: 'id_updated', nullable: true })
  idUpdated: number | null

  @Column('tinyint', { name: 'disabled' })
  disabled: number

  @OneToMany(() => DefectiveRecords, (defectiveRecords) => defectiveRecords.idGoods2)
  defectiveRecords: DefectiveRecords[]

  @OneToMany(() => ExportOrderDetails, (exportOrderDetails) => exportOrderDetails.idGoods2)
  exportOrderDetails: ExportOrderDetails[]

  @OneToMany(() => ExportReceipts, (exportReceipts) => exportReceipts.idGoods2)
  exportReceipts: ExportReceipts[]

  @ManyToOne(() => GoodsTypes, (goodsTypes) => goodsTypes.goods, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'id_type', referencedColumnName: 'idGoodsTypes' }])
  idType2: GoodsTypes

  @ManyToOne(() => GoodsUnits, (goodsUnits) => goodsUnits.goods, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'id_units', referencedColumnName: 'idGoodsUnits' }])
  idUnits2: GoodsUnits

  @ManyToOne(() => Warehouses, (warehouses) => warehouses.goods, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'id_warehouse', referencedColumnName: 'idWarehouse' }])
  idWarehouse2: Warehouses

  @OneToMany(() => ImportOrderDetails, (importOrderDetails) => importOrderDetails.idGoods2)
  importOrderDetails: ImportOrderDetails[]

  @OneToMany(() => StocktakingDetails, (stocktakingDetails) => stocktakingDetails.idGoods2)
  stocktakingDetails: StocktakingDetails[]
}
