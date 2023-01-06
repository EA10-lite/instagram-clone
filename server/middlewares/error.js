
module.exports = (req, res, next) => {
    // log the error
    
    res.status(500).send({ error: "something failed." });
}