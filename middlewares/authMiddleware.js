import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next) =>{
    const starts = req.headers.authorization;
    if(!starts || !starts.startsWith("Bearer"))
    {
        return res.status(400).json({
            success:false,
            message:"Token Must to be provided"
        })
    }

    const token = starts.split(" ")[1];
    try{
        const decode=jwt.verify(token,"secretkey");
        req.user=decode;
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}
