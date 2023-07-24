const db = require('../config/connectDA');
const jwtmd5 = require('../utils/jwtmd5');
const md5 = require('md5'); // Import the md5 library or module

let register = (req, res) => {
    const { Token, Username, Email, Password } = req.body;

    const hash_password = md5(Password);
    try {
        if (Token !== jwtmd5.secretmd5)
            return res.json({
                // results: false,
                status: false,
                message: 'FOBIDEN'
            });
        console.log(hash_password);
        db.query(`select * from users where email = ? and username = ? and password = ?`,
            [Email, Username, hash_password], (error, result) => {
                // console.log(result);

                if (result.length) return res.json({
                    // results: true,
                    status: true,
                    message: 'please login'
                });
                else db.query(`select * from users where email = ? or username = ? `, [Email, Username], (error, result) => {
                    if (result.length) {
                        if (result[0].email === Email) {
                            return res.json({
                                status: 1,
                                message: 'Email has existed'
                            });
                        } else if (result[0].username === Username)
                            return res.json({
                                status: 0,
                                message: 'username has existed'
                            });
                    } return res.json({
                        status: false,
                        message: 'user has not existed'
                    });
                })

            })


    } catch (error) {
        console.log(error);
    }


};




let login = (req, res) => {
    const { Token, Username, Password } = req.body;
    const hash_password = md5(Password)
    try {
        if (Token !== jwtmd5.secretmd5)
            return res.json({
                // results: false,
                status: false,
                message: 'FOBIDEN'
            });

        if (!Username || !Password) {
            return res.json({
                message: 'Fill in the information',
                status: false,
            })
        }
        db.query('SELECT * FROM users WHERE username = ? or email= ?',
            [Username, Username], (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({
                        message: 'Error logging in',
                        status: false,
                    })
                } else {
                    if (results.length > 0) {
                        const user = results[0];
                        console.log(results[0].password);
                        console.log(hash_password);
                        if (hash_password === user.password) {
                            return res.json({
                                status: true,
                                message: 'Login successful',
                                data: user,
                            })
                        } else {
                            return res.json({
                                message: 'Error logging in',
                                status: false,
                            })
                        }
                    } else {
                        return res.status(404).json({
                            message: 'User not found',
                            status: false,
                        })

                    }
                }

            });
    } catch (error) {
        console.log(error);
    }
};


// gọi lại các phương thức
module.exports = {
    register, login
}