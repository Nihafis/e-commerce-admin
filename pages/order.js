import axios from "axios"
import { useEffect, useState } from "react"

const { default: Layout } = require("@/components/Layout")

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrders(response.data)
        })

    }, [])
    console.log(orders);
    return (
        <Layout>
            <h1>Orders</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>paid</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr>
                            <td>
                                {(new Date(order.createdAt)).toLocaleString()}
                            </td>
                            <td className={order.paid? 'text-green-600' : 'text-red-600'}>
                                {order.paid == true ? 'YES' : 'NO'}
                            </td>
                            <td>{order.name} <br></br>
                                {order.city} {order.postalcode} {order.country} <br></br>
                                {order.streetAddress}
                            </td>
                            <td>
                                {order.line_items.map(l => (
                                    <>
                                        {l.price_data.product_data?.name} x {l.quantity} <br />

                                    </>
                                ))}

                            </td>
                        </tr>
                    ))}


                </tbody>

            </table>
        </Layout>
    )
}