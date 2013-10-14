(function() {
  $(function() {
    var formatDate, language, languages, loadSparkline, _i, _len, _results;
    formatDate = function(date) {
      return date.toLocaleDateString();
    };
    loadSparkline = function(language) {
      return $.ajax({
        type: 'GET',
        url: "push_data/" + language + "_github.csv",
        data: null,
        success: function(data) {
          var dates, line, lines, max, maxDate, min, minDate, points, _i, _len;
          lines = data.split(/\n/).slice(1);
          points = [];
          dates = [];
          for (_i = 0, _len = lines.length; _i < _len; _i++) {
            line = lines[_i];
            dates.push(Date.parse(line.split(',')[0]));
            points.push(parseInt(line.split(',')[2]));
          }
          min = _.min(points);
          max = _.max(points);
          minDate = new Date(dates[_.indexOf(points, min)]);
          maxDate = new Date(dates[_.indexOf(points, max)]);
          $("#" + language + "-sparkline").sparkline(points.slice(0, points.length - 1), {
            width: 300,
            height: 40,
            fillColor: '#fefefe',
            lineColor: '#101010'
          });
          $("#" + language + " .min").html(min);
          $("#" + language + " .min-date").html(formatDate(minDate));
          $("#" + language + " .max").html(max);
          return $("#" + language + " .max-date").html(formatDate(maxDate));
        }
      });
    };
    languages = ['coffeescript', 'javascript', 'ruby', 'python', 'go', 'haskell', 'clojure', 'scala', 'viml', 'php', 'elixir', 'erlang'];
    _results = [];
    for (_i = 0, _len = languages.length; _i < _len; _i++) {
      language = languages[_i];
      _results.push(loadSparkline(language));
    }
    return _results;
  });

}).call(this);
