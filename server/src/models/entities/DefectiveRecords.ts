import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Goods } from './Goods'
import { ImportOrders } from './ImportOrders'
import { Users } from './Users'
import { Warehouses } from './Warehouses'

@Index('FK_record_goods_idx', ['idGoods'], {})
@Index('FK_record_import_order_idx', ['idImportOrder'], {})
@Index('FK_record_user_idx', ['idUser'], {})
@Index('FK_record_warehouse_idx', ['idWarehouse'], {})
@Entity('defective_records', { schema: 'quanlykho' })
export class DefectiveRecords {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_defective_records' })
  idDefectiveRecords: number

  @Column('datetime', { name: 'date' })
  date: Date

  @Column('int', { name: 'id_warehouse' })
  idWarehouse: number

  @Column('int', { name: 'id_user' })
  idUser: number

  @Column('int', { name: 'id_import_order' })
  idImportOrder: number

  @Column('int', { name: 'id_goods' })
  idGoods: number

  @Column('varchar', { name: 'quality', length: 45 })
  quality: string

  @Column('float', { name: 'defective_rating', precision: 12 })
  defectiveRating: number

  @Column('varchar', { name: 'solution', length: 100 })
  solution: string

  @Column('int', { name: 'status' })
  status: number

  @Column('datetime', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date

  @Column('int', { name: 'id_updated' })
  idUpdated: number

  @ManyToOne(() => Goods, (goods) => goods.defectiveRecords, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'id_goods', referencedColumnName: 'idGoods' }])
  idGoods2: Goods

  @ManyToOne(() => ImportOrders, (importOrders) => importOrders.defectiveRecords, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'id_import_order', referencedColumnName: 'idImportOrders' }])
  idImportOrder2: ImportOrders

  @ManyToOne(() => Users, (users) => users.defectiveRecords, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'idUsers' }])
  idUser2: Users

  @ManyToOne(() => Warehouses, (warehouses) => warehouses.defectiveRecords, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'id_warehouse', referencedColumnName: 'idWarehouse' }])
  idWarehouse2: Warehouses
}
