class WatchCounts
  constructor: ->
    @el = $('#watch_counts')

  loadData: (language) =>
    $.ajax
      type: 'GET'
      url: "watch_data/#{language}_watches_github.csv"
      data: null
      success: (data) => @populateTable(data, language)

  populateTable: (data, language) =>
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

     @el.find("##{language}-sparkline").sparkline points.slice(0, points.length - 1),
       width: 300, height: 40, fillColor: '#fefefe', lineColor: '#101010'
     @el.find("##{language} .min").html(min)
     @el.find("##{language} .min-date").html(minDate)
     @el.find("##{language} .max").html(max)
     @el.find("##{language} .max-date").html(maxDate)

class PushCounts
  constructor: ->
    @el = $('#push_counts')

  loadData: (language) =>
    $.ajax
      type: 'GET'
      url: "push_data/#{language}_github2.csv"
      data: null
      success: (data) => @populateTable(data, language)

  populateTable: (data, language) =>
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

     @el.find("##{language}-sparkline").sparkline points.slice(0, points.length - 1),
       width: 300, height: 40, fillColor: '#fefefe', lineColor: '#101010'
     @el.find("##{language} .min").html(min)
     @el.find("##{language} .min-date").html(@formatDate(minDate))
     @el.find("##{language} .max").html(max)
     @el.find("##{language} .max-date").html(@formatDate(maxDate))

  formatDate: (date) ->
    date.toLocaleDateString()

$ ->
  watchCounts = new WatchCounts()
  pushCounts = new PushCounts()
  languages = ['coffeescript', 'javascript', 'ruby', 'python', 'go', 'haskell', 'clojure', 'scala', 'viml', 'php', 'elixir', 'erlang', 'java']
  for language in languages
    pushCounts.loadData(language)
    watchCounts.loadData(language)
