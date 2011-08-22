require 'rake'

task :default => [:build, :deploy]

task :build do
  sh "jekyll"
end

task :deploy do
  sh "rsync -avzr _site/ http@nevercertain.com:/srv/apps/nevercertain/"
end
