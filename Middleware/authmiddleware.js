const user_schema = require('../schema/user_schema');

exports.isAuthenticated = async (req, res , next) =>{
    try {
         
        let id= req.headers.id;
        if(!id)
        {
            res.status(401).json({
                message: "Unauthorized User"
            })
        }
        let user = await user_schema.findById({_id : id});
        if(!user)
        {
            return res.status(404).json({
                message: "User not found"
            })
        }
        req.user = user;
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}