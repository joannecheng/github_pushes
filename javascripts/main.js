(function() {
  $(function() {
    var language, languages, loadSparkline, _i, _len, _results;
    loadSparkline = function(language) {
      return $.ajax({
        type: 'GET',
        url: "" + language + "_github.csv",
        data: null,
        success: function(data) {
          var line, lines, points, _i, _len;
          lines = data.split(/\n/).slice(1);
          points = [];
          for (_i = 0, _len = lines.length; _i < _len; _i++) {
            line = lines[_i];
            points.push(parseInt(line.split(',')[2]));
          }
          return $("#" + language).sparkline(points.slice(0, points.length - 1), {
            width: 400,
            height: 50,
            fillColor: '#fefefe',
            lineColor: '#101010'
          });
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
