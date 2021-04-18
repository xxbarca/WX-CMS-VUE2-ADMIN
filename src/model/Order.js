import { post, get, put, _delete } from '@/lin/plugin/axios'

class Order {
    static async getOrderList(data) {
        return await post(`/v1/order/page`, data)
    }
}

export default Order
