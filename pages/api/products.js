
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { isAdminReq } from "./auth/[...nextauth]";


export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isAdminReq(req, res); //chec admin

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findOne({ _id: req.query.id }));
        } else {
            res.json(await Product.find());
        }
    }

    if (method === 'POST') {
        const { title, description, price, images, category, properties } = req.body
        const productDoc = await Product.create({
            title, description, price, images, category, properties
        })


        res.json(productDoc)
    }

    if (method === 'PUT') {
        const { title, description, price, _id, images, category, properties } = req.body
        // console.log(properties);
        await Product.updateOne({ _id }, { title, description, price, images, category :category || undefined, properties });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }
}
