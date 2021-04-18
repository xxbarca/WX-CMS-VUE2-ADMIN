import { post, get, put, _delete } from '@/lin/plugin/axios'

class Order {
    static async getOrderList(id) {
        const res = await get(`/v1/order/page`)
        return res
    }
}

export default Order
