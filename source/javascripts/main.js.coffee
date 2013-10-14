$ ->
  formatDate = (date) ->
    date.toLocaleDateString()

  loadWatchCountsSparkline = (language) ->
    container = $('#watch_counts')
    $.ajax
      type: 'GET'
      url: "watch_data/#{language}_watches_github.csv"
      data: null
      success: (data) ->
        lines = data.split(/\n/).slice(1)
        points = []
        dates = []
        for line in lines
          dates.push line.split(',')[0]
          points.push parseInt(line.split(',')[2])

        min = _.min(points)
        max = _.max(points)
        minDate = dates[_.indexOf(points, min)]
        maxDate = dates[_.indexOf(points, max)]

        container.find("##{language}-sparkline").sparkline points.slice(0, points.length - 1),
          width: 300, height: 40, fillColor: '#fefefe', lineColor: '#101010'
        container.find("##{language} .min").html(min)
        container.find("##{language} .min-date").html(minDate)
        container.find("##{language} .max").html(max)
        container.find("##{language} .max-date").html(maxDate)


  loadPushCountsSparkline = (language) ->
    container = $('#push_counts')
    $.ajax
      type: 'GET'
      url: "push_data/#{language}_github.csv"
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

        container.find("##{language}-sparkline").sparkline points.slice(0, points.length - 1),
          width: 300, height: 40, fillColor: '#fefefe', lineColor: '#101010'
        container.find("##{language} .min").html(min)
        container.find("##{language} .min-date").html(formatDate(minDate))
        container.find("##{language} .max").html(max)
        container.find("##{language} .max-date").html(formatDate(maxDate))

  languages = ['coffeescript', 'javascript', 'ruby', 'python', 'go', 'haskell', 'clojure', 'scala', 'viml', 'php', 'elixir', 'erlang', 'java']
  for language in languages
    loadPushCountsSparkline(language)
    loadWatchCountsSparkline(language)
