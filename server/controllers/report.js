const db = require('../db/models/index');
const Report = db.Report;

//POST /report
const postReport = (req, res, next) => {
    Report.create({
        email: req.body.email,
        reason: req.body.reason
    }).then(reports => {
        res.status(200).send(reports);
    }).catch(e => {
        return res.status(500).json({
            errors: {
                error: e.stack
            },
        })
    })
}

const getReport = async function(req, res) {
    try{
    var dbReports = await Report.findAll({
            id : req.params.id
    }).catch((err) => {throw err;});
    var reports = await Promise.all(dbReports.map(report => { return {"report": report}}));
    res.send(reports)
    } catch(e) {
        return res.status(400).json({
          errors: {
            error: e.stack
          },
        });
      }
}



module.exports = {
    postReport,
    getReport
}