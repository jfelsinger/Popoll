'use strict';

module.exports = {

    /**
     * public func isLoggedIn([string] redirectLocation)
     * 
     * returns a middleware function that redirects if the request is
     * not authenticated
     */
    isLoggedIn: function isLoggedIn(redirectLocation) {
        redirectLocation = redirectLocation || '/';

        return function isloggedInResult(req, res, next) {
            if (req.isAuthenticated()) {
                console.log('authenticated');
                return next();
            }

            console.log('unauthenticated');
            res.redirect(redirectLocation);
        }
    }
}
