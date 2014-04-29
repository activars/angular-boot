Global dependencies 

  Node: 

    npm install -g grunt-cli napa browserify node-static foreman



Install app specific dependencies

    npm install && napa


Generates inital external `dist/main-libs.js`, application `dist/main.js`, css `dist/main.css` files for development
    
    grunt browserify:libs && grunt browserify:app && grunt sass


Running apps in root directory

    nf start
  