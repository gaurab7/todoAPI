import jwt from 'jsonwebtoken'

//middleware here intercepst the nw requests & verify that the token is of correct user
function authM(req, res, next)
{
    //this gets the token from the header => 'authorixation'
    const authHeader = req.headers['authorization'];

    //the token is in : Bearer <token>, this extracts the Bearer and provides just the token
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {return res.status(401).json({msg: 'No Token'})}
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
        if(err) { 
            console.log(token) 
            console.log(err)
            return res.status(401).json({msg: 'Invalid Token'})}
        //all todo API endpoint requests get the userid here
        req.userid = decoded.id
        next()
    })
}
export default authM