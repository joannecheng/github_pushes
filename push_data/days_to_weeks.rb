require 'date'
require 'csv'

languages = ['coffeescript', 'javascript', 'ruby', 'python', 'go', 'haskell', 'clojure', 'scala', 'viml', 'php', 'elixir', 'erlang', 'java']

languages.each do |language|
  rows = []
  current_week = 0
  current_count = 0
  data = CSV.open("#{language}_github.csv").read[1..-1]
  data.each do |d|
    date = d[0]
    push_count = d[2].to_i
    if Date.parse(date).cweek == current_week
      current_count += push_count
    else
      rows << [date, language, current_count]

      current_count = push_count
      current_week = Date.parse(date).cweek
    end
  end

  CSV.open("#{language}_github2.csv", "wb") do |csv|
    csv << ['date', 'language', 'count']
    rows.each { |row| csv << row }
  end
end
