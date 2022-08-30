const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    const decoded = jwt.verify(token, 'hellohowareupuguysjkdf')
    req.userData = decoded
  } catch (err) {
    return res.status(401).json({
      message: 'Please login to orderBooks',
    })
  }
  next()
}
