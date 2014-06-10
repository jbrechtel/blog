require 'rake'
require 'bundler/setup'

task :default => [:build, :deploy]

task :build do
  sh "jekyll"
end

desc 'Build and preview site locally'
task :preview do
  sh "jekyll serve --watch"
end

desc 'deploy site'
task :deploy do
  user = ENV['BLOG_USER'] || 'www-data'
  host = ENV['BLOG_HOST'] || 'nevercertain.com'
  sh "rsync -avzr _site/ #{user}@#{host}:/srv/www/nevercertain/"
end
