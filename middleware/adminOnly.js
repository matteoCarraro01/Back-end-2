export const adminOnly = (req, res, next) => {

    if (req.userUser.role !== "admin") {

        return res.status(403).json({
            message: "Accesso negato"
        });
    }

    next();
 }