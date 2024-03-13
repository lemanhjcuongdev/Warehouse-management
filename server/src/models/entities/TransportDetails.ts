import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TransportReceipts } from './TransportReceipts'

@Index('FK_transport_detail_receipt_idx', ['idTransportReceipt'], {})
@Entity('transport_details', { schema: 'quanlykho' })
export class TransportDetails {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_transport_details' })
  idTransportDetails: number

  @Column('int', { name: 'id_transport_receipt' })
  idTransportReceipt: number

  @ManyToOne(() => TransportReceipts, (transportReceipts) => transportReceipts.transportDetails, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([
    {
      name: 'id_transport_receipt',
      referencedColumnName: 'idTransportReceipts'
    }
  ])
  idTransportReceipt2: TransportReceipts
}
