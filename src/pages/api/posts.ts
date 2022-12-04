import { NextApiHandler } from "next";

const handler: NextApiHandler =  (req, res) => {
    const {method} = req;
    console.log(req.method);

    switch(method) {
        case 'GET':
            res.status(200).json({ok:true});
            break;
        default:
            res.status(404).json({ok:false})
    }
}

export default handler;