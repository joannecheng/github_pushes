(function() {
  $(function() {
    var formatDate, language, languages, loadPushCountsSparkline, loadWatchCountsSparkline, _i, _len, _results;
    formatDate = function(date) {
      return date.toLocaleDateString();
    };
    loadWatchCountsSparkline = function(language) {
      var container;
      container = $('#watch_counts');
      return $.ajax({
        type: 'GET',
        url: "watch_data/" + language + "_watches_github.csv",
        data: null,
        success: function(data) {
          var dates, line, lines, max, maxDate, min, minDate, points, _i, _len;
          lines = data.split(/\n/).slice(1);
          points = [];
          dates = [];
          for (_i = 0, _len = lines.length; _i < _len; _i++) {
            line = lines[_i];
            dates.push(line.split(',')[0]);
            points.push(parseInt(line.split(',')[2]));
          }
          min = _.min(points);
          max = _.max(points);
          minDate = dates[_.indexOf(points, min)];
          maxDate = dates[_.indexOf(points, max)];
          container.find("#" + language + "-sparkline").sparkline(points.slice(0, points.length - 1), {
            width: 300,
            height: 40,
            fillColor: '#fefefe',
            lineColor: '#101010'
          });
          container.find("#" + language + " .min").html(min);
          container.find("#" + language + " .min-date").html(minDate);
          container.find("#" + language + " .max").html(max);
          return container.find("#" + language + " .max-date").html(maxDate);
        }
      });
    };
    loadPushCountsSparkline = function(language) {
      var container;
      container = $('#push_counts');
      return $.ajax({
        type: 'GET',
        url: "push_data/" + language + "_github2.csv",
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
          container.find("#" + language + "-sparkline").sparkline(points.slice(0, points.length - 1), {
            width: 300,
            height: 40,
            fillColor: '#fefefe',
            lineColor: '#101010'
          });
          container.find("#" + language + " .min").html(min);
          container.find("#" + language + " .min-date").html(formatDate(minDate));
          container.find("#" + language + " .max").html(max);
          return container.find("#" + language + " .max-date").html(formatDate(maxDate));
        }
      });
    };
    languages = ['coffeescript', 'javascript', 'ruby', 'python', 'go', 'haskell', 'clojure', 'scala', 'viml', 'php', 'elixir', 'erlang', 'java'];
    _results = [];
    for (_i = 0, _len = languages.length; _i < _len; _i++) {
      language = languages[_i];
      loadPushCountsSparkline(language);
      _results.push(loadWatchCountsSparkline(language));
    }
    return _results;
  });

}).call(this);
