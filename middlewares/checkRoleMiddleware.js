export const checkRoleMiddleware = (allowedRoles) =>{
    return (req,res,next)=>{
        const userRole=req.user.role;
        if(!allowedRoles.includes(userRole) || !allowedRoles.includes(userRole)
        || !allowedRoles.includes(userRole))
        {
            res.status(400).json({
                success:false,
                message:"You don't have permission"
            })
        }
        next();
    }
}