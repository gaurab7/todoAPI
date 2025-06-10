import jwt from 'jsonwebtoken'

//middleware here intercepst the nw requests & verify that the token is of correct user
function authMiddleware(req, res, next)
{
    const token = req.headers['authorization']
    if(!token) {return res.status(401).json({msg: 'No Token'})}
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
        if(err) { return res.status(401).json({msg: 'Invalid Token'})}
        req.userid = decoded.id
        next()
    })
}
export default authMiddleware