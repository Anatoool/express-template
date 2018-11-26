const userRegistration = (req, res) => {

    const user = req.body;
    console.log(user);
    // addUser(user.login,
    //     user.password,
    //     user.email, (value) => {
    //         console.log('Пользователь добавлен', value);
    //         res.json({user: 'add'});
    //     });
};

module.exports = userRegistration;