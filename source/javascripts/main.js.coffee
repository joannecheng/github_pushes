$ ->
  formatDate = (date) ->
    date.toLocaleDateString()

  loadSparkline = (language) ->
    $.ajax
      type: 'GET'
      url: "#{language}_github.csv"
      data: null
      success: (data) ->
        lines = data.split(/\n/).slice(1)
        points = []
        dates = []
        for line in lines
          dates.push Date.parse(line.split(',')[0])
          points.push parseInt(line.split(',')[2])

        min = _.min(points)
        max = _.max(points)
        minDate = new Date(dates[_.indexOf(points, min)])
        maxDate = new Date(dates[_.indexOf(points, max)])

        $("##{language}-sparkline").sparkline points.slice(0, points.length - 1),
          width: 300, height: 40, fillColor: '#fefefe', lineColor: '#101010'
        $("##{language} .min").html(min)
        $("##{language} .min-date").html(formatDate(minDate))
        $("##{language} .max").html(max)
        $("##{language} .max-date").html(formatDate(maxDate))

  languages = ['coffeescript', 'javascript', 'ruby', 'python', 'go', 'haskell', 'clojure', 'scala', 'viml', 'php', 'elixir', 'erlang']
  for language in languages
    loadSparkline(language)
