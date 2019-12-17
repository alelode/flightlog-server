module.exports = function(app, db) {
  //get all pilots
  app.get("/pilots", (req, res, next) => {
    var offset = req.query.offset;
    var limit = req.query.limit;

    try {
      var limitInt = parseInt(limit);
      var offsetInt = parseInt(offset);

      if (limitInt > 500) {
        res
          .status(400)
          .json({ error: "The limit must not be greater than 500" });
      }

      let stmt = db
        .prepare("SELECT * FROM pilots ORDER BY name LIMIT ? OFFSET ?")
        .bind(limitInt, offsetInt);
      const rows = stmt.all();
      res.json(rows);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
};
