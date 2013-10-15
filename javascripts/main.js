(function() {
  var PushCounts, WatchCounts,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  WatchCounts = (function() {
    function WatchCounts() {
      this.populateTable = __bind(this.populateTable, this);
      this.loadData = __bind(this.loadData, this);
      this.el = $('#watch_counts');
    }

    WatchCounts.prototype.loadData = function(language) {
      var _this = this;
      return $.ajax({
        type: 'GET',
        url: "watch_data/" + language + "_watches_github.csv",
        data: null,
        success: function(data) {
          return _this.populateTable(data, language);
        }
      });
    };

    WatchCounts.prototype.populateTable = function(data, language) {
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
      this.el.find("#" + language + "-sparkline").sparkline(points.slice(0, points.length - 1), {
        width: 300,
        height: 40,
        fillColor: '#fefefe',
        lineColor: '#101010'
      });
      this.el.find("#" + language + " .min").html(min);
      this.el.find("#" + language + " .min-date").html(minDate);
      this.el.find("#" + language + " .max").html(max);
      return this.el.find("#" + language + " .max-date").html(maxDate);
    };

    return WatchCounts;

  })();

  PushCounts = (function() {
    function PushCounts() {
      this.populateTable = __bind(this.populateTable, this);
      this.loadData = __bind(this.loadData, this);
      this.el = $('#push_counts');
    }

    PushCounts.prototype.loadData = function(language) {
      var _this = this;
      return $.ajax({
        type: 'GET',
        url: "push_data/" + language + "_github2.csv",
        data: null,
        success: function(data) {
          return _this.populateTable(data, language);
        }
      });
    };

    PushCounts.prototype.populateTable = function(data, language) {
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
      this.el.find("#" + language + "-sparkline").sparkline(points.slice(0, points.length - 1), {
        width: 300,
        height: 40,
        fillColor: '#fefefe',
        lineColor: '#101010'
      });
      this.el.find("#" + language + " .min").html(min);
      this.el.find("#" + language + " .min-date").html(this.formatDate(minDate));
      this.el.find("#" + language + " .max").html(max);
      return this.el.find("#" + language + " .max-date").html(this.formatDate(maxDate));
    };

    PushCounts.prototype.formatDate = function(date) {
      return date.toLocaleDateString();
    };

    return PushCounts;

  })();

  $(function() {
    var language, languages, pushCounts, watchCounts, _i, _len, _results;
    watchCounts = new WatchCounts();
    pushCounts = new PushCounts();
    languages = ['coffeescript', 'javascript', 'ruby', 'python', 'go', 'haskell', 'clojure', 'scala', 'viml', 'php', 'elixir', 'erlang', 'java'];
    _results = [];
    for (_i = 0, _len = languages.length; _i < _len; _i++) {
      language = languages[_i];
      pushCounts.loadData(language);
      _results.push(watchCounts.loadData(language));
    }
    return _results;
  });

}).call(this);
