const indexView = (req, res, next) => {
    res.render('home');
}

const mapView = (req, res, next) => {
    res.render('maps');
}


module.exports = {
    indexView,
    mapView

}