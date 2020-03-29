# Bar Exam

### Feature List
##### Incomplete
* Convert App.js activeComponent/intent into a global context
* Add Home/Back button to AddBar.js page (use activeComponent context) 
* Display prieviously saved bars in LyricView.js
* Style App.js
* Style Game.js (create grid of ArtistButton.js components)
* Style ArtistButton.js (artist grayscale image behind artist name)
* Style SongOption.js (classic material ui card, display image, title, and artist )
* Style SongSelector.js (create grid of SongOption.js components)
* Style LyricView.js (maybe go for a genius-like design)
* Limit amount of time per each bar (Create a timer in Game.js)
##### Complete
* Limit number of api calls to /searchsong (AddBar.js)
* Conditionally render components from App.js based on activeComponent
* Fetch batch of bars in Game.js, fetch new batch when current batch empty
* Verify selected artist in Game.js
* Autogenerate list of suggestions based on song search query (AddBar.js)
* Fetch/Display lyrics of selected song (LyricView.js)
* Create popover button over selected text (LyricView.js)
* POST the highlighted bar to Flask API (LyricView.js)