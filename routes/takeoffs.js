module.exports = function(app, db) {
  //get all takeoffs
  app.get("/takeoffs", (req, res, next) => {
    var offset = req.query.offset;
    var limit = req.query.limit;
    var orderby = req.query.orderby;
    var asc = req.query.asc;

    try {
      var limitInt = parseInt(limit);
      var offsetInt = parseInt(offset);
      var sort = asc ? "ASC" : "DESC";
      if (limitInt > 500) {
        res
          .status(400)
          .json({ error: "The limit must not be greater than 500" });
      }

      let stmt = db
        .prepare(
          "SELECT * FROM takeoffs ORDER BY ? " + sort + " LIMIT ? OFFSET ?"
        )
        .bind(orderby, limitInt, offsetInt);
      const rows = stmt.all();
      res.json(rows);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
};
