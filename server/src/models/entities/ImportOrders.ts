import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DefectiveRecords } from './DefectiveRecords'
import { ImportOrderDetails } from './ImportOrderDetails'
import { Providers } from './Providers'
import { ImportReceipts } from './ImportReceipts'

@Index('FK_import_provider_idx', ['idProvider'], {})
@Entity('import_orders', { schema: 'quanlykho' })
export class ImportOrders {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_import_orders' })
  idImportOrders: number

  @Column('datetime', { name: 'order_date' })
  orderDate: Date

  @Column('int', { name: 'id_provider' })
  idProvider: number

  @Column('int', { name: 'status' })
  status: number

  @OneToMany(() => DefectiveRecords, (defectiveRecords) => defectiveRecords.idImportOrder2)
  defectiveRecords: DefectiveRecords[]

  @OneToMany(() => ImportOrderDetails, (importOrderDetails) => importOrderDetails.idImportOrder2)
  importOrderDetails: ImportOrderDetails[]

  @ManyToOne(() => Providers, (providers) => providers.importOrders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'id_provider', referencedColumnName: 'idProviders' }])
  idProvider2: Providers

  @OneToMany(() => ImportReceipts, (importReceipts) => importReceipts.idImportOrder2)
  importReceipts: ImportReceipts[]
}
