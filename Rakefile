require 'rake'
require 'bundler/setup'

task :default => [:build, :deploy]

task :build do
  sh "jekyll"
end

desc 'Build and preview site locally'
task :preview do
  sh "jekyll serve -H 0.0.0.0 --watch"
end

desc 'deploy site'
task :deploy do
  user = ENV['BLOG_USER'] || 'jbrechtel'
  host = ENV['BLOG_HOST'] || 'nevercertain.com'
  sh "rsync -avzr _site/ #{user}@#{host}:www/nevercertain/"
end
