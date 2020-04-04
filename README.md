# Bar Exam

### Feature List
##### Incomplete
* Style popover in LyricView.js
* Prevent adding a bar longer than current database limit
* Don't allow previously submitted bar to be added
* Make LyricView.js styling adjustable for smaller displays
* Add spinning vinyl to on hover for SongOption.js (https://codepen.io/marcruecker/pen/mBJVBX)
* Read verse notes \[Chorus] to find true artist of bar
* Remove IncorrectArtist fields from bar table in database (generate on-the-fly)
* Add instructions popup for Game.js
* Raining bars (have bars falling in the background)
##### Complete
* Highlight bar just added after refresh (not currently working, LyricView.js)
* Limit amount of time per each bar (Create a timer in Game.js)
* Move ArtistButtons further to the corner
* Style Game.js (create grid of ArtistButton.js components)
* Style ArtistButton.js (artist grayscale image behind artist name)
* Style LyricView.js (maybe go for a genius-like design)
* Style SongOption.js (classic material ui card, display image, title, and artist )
* Style SongSelector.js (create grid of SongOption.js components)
* Style Start.js
* Display prieviously saved bars in LyricView.js
* Add Home/Back button to AddBar.js page (use activeComponent context) 
* Convert App.js activeComponent/intent into a global context
* Limit number of api calls to /searchsong (AddBar.js)
* Conditionally render components from App.js based on activeComponent
* Fetch batch of bars in Game.js, fetch new batch when current batch empty
* Verify selected artist in Game.js
* Autogenerate list of suggestions based on song search query (AddBar.js)
* Fetch/Display lyrics of selected song (LyricView.js)
* Create popover button over selected text (LyricView.js)
* POST the highlighted bar to Flask API (LyricView.js)