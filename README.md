# README

This is the test for becoming a developer at Cumplo Chile the steps to run the project are the followings:


* The Ruby version to run this project is `ruby 2.4.1` and the Rails version is `Rails 5.1.3`

* After installing the proper ruby and Rails version go to the root path and run `bundle install`

* Go to mysql and create the database `cumplo_development`

* For creating the database run `rake db:migrate` and then run `rake db:seed` for filling up the database

* You must run from the root path `yarn install` and then `bin/webpack-dev-server`

* For running the test run `rspec` in the root path

* The admin user by default is `admin@cumplo.cl` and the password is `foobar123`

* The project is currently in heroku in `http://cumplo-server.herokuapp.com`