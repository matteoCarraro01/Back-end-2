export const adminOnly = (req, res, next) => {

    console.log(req.authUSer);
    
    if (!req.authUser || req.authUser.role !== "admin") {

        return res.status(403).json({
            message: "Accesso negato"
        });
    }

    next();
 };