## angular-boot

Pure opinionated angular project boostrapping example:

* Build large scale app Angular.js
* CommonJS to manage Angular modules
* Styling with SASS
* Continuously building Javascript and SASS with grunt watch in development environment
* Configure Gruntfile.js to manage your own stacks

##### Global dependencies
    npm install -g grunt-cli napa browserify node-static foreman karma-cli


#### Install app specific dependencies
 
    npm install && napa


Generates inital external `dist/main-libs.js`, application `dist/main.js`, css `dist/main.css` files for development
    
    grunt browserify:libs && grunt browserify:app && grunt sass


Running apps in root directory

    nf start
  
