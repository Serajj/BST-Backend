

module.exports = {

    checkLogin: (req, res, next) => {
        let token = req.session;
        if (token) {
            // Remove Bearer from string
            if (token.loggedin && token.serajisagoodprogrammer == "ofcourse" && token.username != null) {

                next();
                console.log("hello dear" + token.username);

            } else {
                res.redirect('/admin/login');
            }

        } else {
            res.redirect('/admin/login');
        }
    }
}