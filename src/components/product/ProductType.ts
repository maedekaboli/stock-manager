import ReservedItemType from '../reservation/ReservedItemType'

export default interface ProductType {
    id: number
    name?: string
    stock: number
    reservations: ReservedItemType[]
}
