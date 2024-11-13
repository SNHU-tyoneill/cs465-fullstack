/* GET Homepage */ 
const index = (req, res) => {
    res.render('index', { title: "Travr Getaways" });
};

module.exports = {
    index
}