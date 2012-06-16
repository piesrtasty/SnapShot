# SnapShot

A photo album built on top of a Ruby on Rails (3.1) backend with a Backbone.js frontend.

## Installation

Install Ruby (preferably through RVM) by entering the following in a terminal.

<code>$ curl -L https://get.rvm.io | bash -s stable --ruby</code>

After RVM installs, add the following to your bash profile to ensure RVM is loaded into every new shell session

<code>[[ -s "/Users/{{ YOUR USERNAME }}/.rvm/scripts/rvm" ]] && source "/Users/{{ YOUR USERNAME }}/.rvm/scripts/rvm"</code>

Install Ruby 1.9.2.

<code>rvm install ruby-1.9.2</code>

Install Bundler (RubyGem)

<code>gem install bundler</code>

## Quick Start

Inside of the applications directory install the gem bundle specified in the Gemfile.

<code>bundle</code> (Which is a shortcut for 'bundle install'

Populate the database with tables.

<code>rake db:migrate</code>

Start the server.

<code>rails server</code>
