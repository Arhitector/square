#Markup boilerplate.

Modules:
- jade
- sprites
- less (or sass), less by default
- image minifier
- livereload
- server

##Steps:
- Go to the directory with the project
- In the console: npm install (and wait)
- npm start
- open [http://localhost:8080/markup/](http://localhost:8080/markup/)
- enjoy

Reload works while maintaining and autobuild sass, less files.

##CSS architecture
- all.* - import all style here (sourcemap require import all styles into one common file).
- components - folder for style components like, _table, _buttons, _forms, etc.
- modules - some kind of interface or layouts _header, _footer, _article, etc.
- vendor - libs, plugins styles.

##Important:
- a markup language sass has two dependences, they are  Ruby and of course sass for Ruby itself. It's nesessary to install these dependences before using your platform
- sass sourcemap require (Sass 3.3.0, which can be installed with gem install sass --pre) and uncomment sourcemap in Gruntfile.js
- if you need one of the languages in your project it's better to disable the second one to avoid errors (see the file Gruntfile.js and params "CSSBuilder").
- use one common file to import less or sass styles (require for sourcemap) all.less, all.scss
