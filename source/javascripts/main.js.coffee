$ ->
  loadSparkline = (language) ->
    $.ajax
      type: 'GET'
      url: "#{language}_github.csv"
      data: null
      success: (data) ->
        lines = data.split(/\n/).slice(1)
        points = []
        for line in lines
          points.push parseInt(line.split(',')[2])

        $("##{language}").sparkline points.slice(0, points.length - 1),
          width: 300, height: 40, fillColor: '#fefefe', lineColor: '#101010'

  languages = ['coffeescript', 'javascript', 'ruby', 'python', 'go', 'haskell', 'clojure', 'scala', 'viml', 'php', 'elixir', 'erlang']
  for language in languages
    loadSparkline(language)
