# Ember-ol3-leak

This application serves to demonstrate a memory leak that occurs in the browser when [Ember.js] (http://emberjs.com/) and [Openlayers 3] (openlayer.org) are used together.  

## Application structure 
The project was created with ember-cli 2.8.0. The default configuration (including npm and bower dependencies) has not been modified.
Openlayers 3.20.0 is located in the vendor directory and imported through ember-cli-build.js.
The ember application itself consists of only an application controller, application template and a component named ol-map, which contains, creates and tears down the Openlayers map.
The map shows only single vector layer that contains 24000 LineString elements.     

## Memory problems

We observed memory leaks in the following two cases:
1 repeatedly creating and destroying the map component (by means of a checkbox in the application template)
2 reloading the browser tab by either manually or through javascript (location.reload)

All testing was done on Microsoft Windows 7 and 10.
In Internet Explorer 11 (v11.0.37) more than 50 megabytes of memory are leaked on each tab reload or removal of the map. The browsers seems incapable of releasing the memory.
Firefox 50 reacts to both actions by allocating large amounts of memory, but does not exhibit a hard memory leak, as it is able to release the memory.
Chrome 55 and Edge (v20.1240) show neither of the problems.

## Further observations

When put into a plain html document, (no ember.js) the same Openlayers map does not cause any abnormal increase in memory consumption in any of the above browsers.
Also, reducing the number of elements in the map to 8000 makes Internet Explorer 11 behave like Firefox 50,
i.e. the hard memory leak disappears but the browser still uses an unusually large amount of memory. 
The number of elements needed to cause the hard memory leak seemsto depend on the machine the browser is running on (could be the amount of available memory). 

## Appeal for help

We were not able to figure out the reason for the observed beaviour.
If you have any idea as to why this leak occurs or what we are doing wrong (regarding ember, ol3, or otherweise) please let us know.
Feel free to file an issue report or contact mario.wilde@bvu.de.