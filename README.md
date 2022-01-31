# RAILS_REACT_MATERIAL DEMO APP

This application demonstrates how to use following:
1. Devise for auth / registration
2. Devise JWT auth
3. React integration with Rails app
4. Material UI integration with React app

### Database:
For the demo purpose we will use Sqlite database.


### Local Steup:

1. Clone the repo
2. After change the directory to the cloned repo install gems & bundle

  ```
    cd rails_react_material_demo
    bundle
    yarn
  ```

3. Run Migrations
  ```
    rake db:migrate
  ```

4. Start dev server
   rails s


### Production Setup

1. Clone the repo
2. After change the directory to the cloned repo install gems & bundle

  ```
    cd rails_react_material_demo
    bundle
    yarn
  ```

3. Run Migrations

  ```
    RAILS_ENV=production rake db:migrate
  ```

4. Run webpack to build react app
  ```
    RAILS_ENV=production RACK_ENV=production NODE_ENV=production bin/webpack
  ```

5. Run application
  ```
    RAILS_SERVE_STATIC_FILES=true rails server -e production
  ```