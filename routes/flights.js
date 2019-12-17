module.exports = function(app, db) {
  var flightProperties = [
    "id",
    "pilotid",
    "date",
    "country",
    "takeoff",
    "glider",
    "duration",
    "distance",
    "maxaltitude",
    "description",
    "opendistance",
    "trackloglink"
  ];

  app.get("/flights", (req, res, next) => {
    var offset = req.query.offset;
    var limit = req.query.limit;
    var orderby = req.query.orderby;
    var asc = req.query.asc === "true";
    var onlyWithTrack = req.query.onlyWithTrack === "true";

    if (flightProperties.indexOf(orderby) == -1) {
      res.status(400).json({ msg: e.message });
    } else {
      try {
        var limitInt = parseInt(limit);
        var offsetInt = parseInt(offset);
        var sort = asc ? "DESC" : "ASC";
        if (limitInt > 500) {
          res
            .status(400)
            .json({ error: "The limit must not be greater than 500" });
        }

        var query =
          "SELECT * FROM flights WHERE test = 0 " +
          (onlyWithTrack ? "AND trackloglink <> ''" : "") +
          " ORDER BY " +
          orderby +
          " " +
          sort +
          " LIMIT ? OFFSET ?";

        let stmt = db.prepare(query).bind(limitInt, offsetInt);

        const rows = stmt.all();
        res.json(rows);
      } catch (e) {
        res.status(400).json({ msg: e.message });
      }
    }
  });

  //get all flights from pilot
  app.get("/flights/:pilotId", (req, res, next) => {
    var offset = req.query.offset;
    var limit = req.query.limit;
    var pilotId = req.params.pilotId;

    try {
      var limitInt = parseInt(limit);
      var offsetInt = parseInt(offset);
      var pilotIdInt = parseInt(pilotId);

      if (limitInt > 500) {
        res
          .status(400)
          .json({ error: "The limit must not be greater than 500" });
      }

      let stmt = db
        .prepare(
          "SELECT * FROM flights WHERE TEST = 0 AND pilotid = ? LIMIT ? OFFSET ?"
        )
        .bind(pilotIdInt, limitInt, offsetInt);
      const rows = stmt.all();
      res.json(rows);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

  //Get flights count for pilot
  app.get("/flights/:pilotId/total", (req, res, next) => {
    var pilotId = req.params.pilotId;

    try {
      var pilotIdInt = parseInt(pilotId);

      let stmt = db
        .prepare("SELECT COUNT(id) FROM flights WHERE TEST = 0 AND pilotid = ?")
        .bind(pilotIdInt);
      res.json(stmt.get()["COUNT(id)"]);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
};
