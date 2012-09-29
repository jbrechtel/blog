require 'rake'

task :default => [:build, :deploy]

task :build do
  sh "jekyll"
end

desc 'Build and preview site locally'
task :preview do
  sh "jekyll --auto --server"
end

desc 'deploy site'
task :deploy do
  sh "rsync -avzr _site/ www-data@nevercertain.com:/www/nevercertain/"
end
