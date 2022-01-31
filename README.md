# RAILS_REACT_MATERIAL DEMO APP

This application demonstrates how to use following:
1. Devise for auth / registration
2. Devise JWT auth
3. React integration with Rails app
4. Material UI integration with React app

### Database:
For the demo purpose we will use Sqlite database.

### Prerequisites

In order to setup the app you need following
1. Node v16.13.0
   We can use NVM to setup different versions of the node.
   Setup instructions can be found [here](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/)

2. Ruby 3.1.0
   RVM can be used to install ruby 3.1.0


### Local Steup:

1. Clone the repo
2. After change the directory to the cloned repo install gems & bundle

  ```
    cd rails_react_material_demo
    bundle
    yarn
  ```

3. Setup master key
  if you have master key value & credentials.yml.enc then use that.
  Otherwise delete config/credentials.yml.enc & create new using following command

  ```
  EDITOR="mate --wait" bin/rails credentials:edit
  ```

4. Run Migrations
  ```
    rake db:migrate
  ```

5. Start dev server
  ```
   rails s -p 4001
   ```


### Production Setup

1. Clone the repo
2. After changing the directory to the cloned repo install gems & bundle

  ```
  cd rails_react_material_demo
  bundle
  yarn
  ```
3. Setup master key
   if you have master key value & credentials.yml.enc then use that.
   Otherwise delete config/credentials.yml.enc & create new using following command

   ```
   EDITOR="mate --wait" bin/rails credentials:edit
   ```

4. Setup db & Run Migrations

  ```
  RAILS_ENV=production rake db:setup
  ```

5. Run webpack to build react app
  ```
  RAILS_ENV=production RACK_ENV=production NODE_ENV=production bin/webpack
  ```

6. Run application
  ```
  RAILS_SERVE_STATIC_FILES=true rails server -e production -p 4001
  ```


### Notes:

1. Email delivery is not functional in prod env as it needs SMTP setup.
   I have added sample config in environments/production.rb which can be used to setup Sendgrid for email delivery.

   In development mode, emails can be previewed in browser.

### Todos

- [] Add unit tests
- [] Add env var setup
- [] Create gemset