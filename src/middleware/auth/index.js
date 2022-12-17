const jwt = require('jsonwebtoken');
const user = require('../../domains/users/User');
const User = new user().getInstance();

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({'_id':decoded._id, 'tokens.token':token});
        if(!user){ 
            throw new Error()
        }

        req.token = token
        req.user = user
        next();
    } catch (e) {
        res.status(401).send('Unauthorized!..')
    }

};

module.exports = auth