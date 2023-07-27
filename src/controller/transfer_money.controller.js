const db = require('../config/connectDA');
const jwtmd5 = require('../utils/jwtmd5.utils');
const md5 = require('md5'); // Import the md5 library or module

let tranfer_money = (req, res) => {
    const { Token, Username, Password, Amount } = req.body;
    console.log(Username);

    try {
        if (Token !== jwtmd5.secretmd5)
            return res.json({
                // results: false,
                status: false,
                message: 'FOBIDEN'
            });
        if (!Username || !Password || !Amount) {
            return res.json({
                message: 'Fill in the information',
                status: false,
            })
        }
        const hash_password = md5(Password)
        console.log(hash_password);
        db.query(`SELECT * FROM users u where ((u.username = ? and u.password = ?) OR (u.email = ? and u.password = ?))`
            , [Username, hash_password, Username, hash_password], (error, results_login, fields) => {
                if (results_login.length == 1) {
                    db.query(`SELECT * FROM tb_wallet_code w WHERE w.amount > ${Amount} and w.id = ${results_login[0].id}`,
                        (err, results) => {
                            if (results.length >= 1) {
                                const coin = results[0].amount - Amount
                                console.log(coin);
                                const id = results[0].id;
                                console.log(id);
                                db.query(
                                    "UPDATE tb_wallet_code SET amount = ? WHERE id = ?",
                                    [coin, id],
                                    (error, data, fields) => {
                                        if (error) {
                                            // Handle the error appropriately
                                            return res.json({
                                                message: "An error occurred",
                                                status: false,
                                            });
                                        }

                                        return res.json({
                                            data: {
                                                status: true,
                                                balance: coin,
                                            },
                                        });
                                    });
                            } else return res.json({
                                message: "insufficient account balance",
                                status: false,
                            })
                        })
                }
                if (results_login.length < 1) {
                    return res.json({
                        message: "ERROR LOGIN",
                        status: false,
                    })
                }
            }
        )

    } catch (error) {
        console.log(error);
    }
};

// gọi lại các phương thức
module.exports = {
    tranfer_money
}