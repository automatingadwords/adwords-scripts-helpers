# adwords-scripts-helpers

Commonly used AdWords Scripts (Google Ads Scripts) functions. 

We'll endevour to keep everything backwards compatable but make no promises.

If used we recommend hosting the functions yourself for use as they may be updated and break your code.

You can then pull our changes as you see fit. 

## Usage

Easy. eval("url-to-the-script/bootstrap.js")

It's important files are secure when using eval()!

## bootstrap.js

This just evals the below scripts - just load this to pull everything in.

## helpers.js

Generic functions for things like logging, checking for numbers, etc.

var h = new Helper();  
h.log("hey!");  
h.isNumber("Bricks");//false  
etc...

## settings.js

Anything to do with grabbing, processing and checking settings


