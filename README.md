This is just a repository to keep the files I created while going through Sofware Carpentry's D3 Visualizing Data lessons. The lessons are still an early version, so this README is where I'll keep notes that don't belong in any commit messages. More serious errors/mistakes are in emphasized text. It's intended solely to give the workshop designers constructive and critical feedback.

Tested with *Chrome* **Version 44.0.2403.155 (64-bit)** on Ubuntu 15.04

#### 01 - HTML
Mostly straight-forward. The last HTML Cell contains incorrect `div` tags, using<div/> instead of </div>.

#### 02 - CSS
Style tags use two spellings of color/colour

No where is it actually mentioned what "CSS" is an acronym for (Cascading Style Sheets).

The font-size 10px displays text smaller than the default, so calling it a "big" heading is a bit of a misnomer.

The formatting of the HTML cells suggests this is a different HTML file from the previous one, but it's never explicitly stated to create a new html file.

**The link to the CSS stylesheet is incorrect. The attribute in the index.html file uses `href="css/styles.css"`, but the CSS file we're instructed to create is in the same directory as the html. This tag only works if the CSS file is in a folder named "css." Either the directory needs to be created and the file moved into it or `css/` needs to be removed from the tag.**

#### 03 - Images and SVG
I refreshed the page before making the .image class in the CSS, so the image came up as much larger than expected. Maybe the CSS should be done before the HTML section?

**The `position` and `left` tags in the image CSS class defintion worked but the image didn't resize. I was able to fix this by moving the `class="image"` attribute inside the `img` tag instead of `div`.**

Creating the circle was a very easy task by comparison, so I feel like this section of the lesson could be augmented or lengthened to be a bit more advanced. The optional "Make Art!" section at the end could be expanded to fill this. There are also a couple of punctuation errors near the end of this section.

#### 04 - Published with Github
Since I started following this lesson by git-initializing the `my_first_website`folder, I didn't follow through the instructions on this lesson to make a whole new respository, because I'm already pretty familiar with git and github. I think this lesson might actually be more valuable if the set-up in the first section went about it this way, because many projects participants might want to publish to github probably already have directories or components made, and this seems like a more likely scenario than participants remembering to create a new repository before doing anything they may end up wanting to upload. Showing how to create a respository and set an upstream origin URL could be a valuable lesson if this section is left in.

#### 05 - JavaScript
This lesson seems to move pretty quickly into JavaScript programming, assuming the participants can distinguish what's HTML from JS. Perhaps a few senteneces re-iterating that JavaScript is its own programming language independent of HTML and adding more emphasis to components of that language (e.g. getElementByID, the "document" handle, EventListener type objects) would ease the transition and keep these pieces of knowledge distinct.

The same code block for adding the event listener is shown twice, whereas the paragraph can probably be restructured to only include it once.

Without prior programming experience with functions, the two forms of adding the meow function might be a little much, though I'm not sure how to space this out more within the lesson.

**Not gonna lie. I tripped up on this part and cost myself a lot of time simply because I used getElementByID by mistake instead of getElementById. That's a potentially common pitfall to watch out for.**

Misspelled `console` as `colsole` in the "Debugging in a Browser" section.

By the end of the lesson, all of the elements work but increasing and decreasing the width also changes the height. My browser, and perhaps others, maybe by default conserve the ratio of the image dimensions. Planning ahead for this would help. I don't see any differences in my code from what's given that would lead to this change.

Putting the buttons in the same `<div>` as the image also leads to a slightly different display, but the function is the same.

#### 06 - JSON Data Format

The first part of this lesson was familiar to me, and I assume the practice commands are meant to be tried on the JavaScript debug console, not put in a file, so there's no code associated with the introduction of this section.

It seems like the introduction to what a `var` is and how to use it belongs more in the JavaScript lesson (05) than this one. One trivial way would be to add one more button task to print out a "response" from the cat with a sentence stored in a string variable. That way, this lesson can concern itself solely with JSON's \{\} and \[\] syntax.

This lesson seems to use the words "list" and "array" interchangeably. This shouldn't cause problems, but it's good to be aware of. In most cases, I think "array" would be the more appropriate of the two, technically speaking.

**The "Nesting" and "Array of objects" sections are identical.**

There's no link on the main page to `nations.json`, so I found the link myself on Mike Bostock's website with a little URL hacking. My file may contain more data than was intended in the tutorial.

#### 07 - D3 Setup

The file-naming notation is inconsistent throughout this page - I haven't noticed this on previous lessons. For example, a file may be presented as just its name (main.css), with quotes ('main.css') or in code typeface (`main.css`).

The line `d3.json(..., function(nations) {}` is missing a close-parenthesis.

Might be a good idea to include a little discussion on how `d3.select()` differs from `document.getElementById()` and why it's preferable to use the former. Clearly we want to use the functions in d3.js but it's not immediately clear why the old way wouldn't also work.

I notice the `var frame = ` line is the only one here that doesn't have a comment line preceeding it.

It's not clear whether the intent for the last exercise is to add the circle element to the top level body of the HTML or within one of the other elements.

**I noticed, doing this on Chrome, that the browser will not allow loading of files (e.g. nations.json) from the local computer as part of Chrome's security features. I believe this can be solved by requesting the json directly from the site of origin. Alternatively, files will need to be served over http or https, which is not covered in the lesson.**

It would help to have at least one example of how to use the `style` method given on the page.

Note, if the participants add their svg and circle objects after the call to import `main.js` the DOM will likely fail because the svg hasn't been read yet. This is easily fixed by specifying that they add their object before the two `<script>` elements, or it's also a good time to play with the `defer` keyword argument to delay the execution of imported scripts, e.g. `<script defer src="...">`.

#### 08 - D3 Into The Data

The line where `xAxis` is initialized says it's creating the x and y axes, when it only creates the first. I imagine this is just because it was decided later to leave the creation of the y-axis as an exercise.

Since we're only using this data once for plotting, it may be more beneficial to use `pop()` instead of `x.length-1` indexing to get the last element of the arrays for life expectancy and income.

**Because I acquired the file by my own means, it looks like the format is different from that given on the SWC page. Instead of having the years, income, and life expectancies in separate arrays, the latter two are arrays where every element is a 2-element array containing the year and the value, so the commands on my file here will be different.**

In the exercise, the phrase "don't forget to include a mapping function for the scale of the population" is a little nebulous. I assume it's just a reminder to provide a function when updating the "r" attribute instead of a static value, but perhaps this can be stated more plainly if my interpretation is correct.

During the exercise, I accidentally made the type of using 8e5 as the upper limit of the population domain instead of 5e8, and the result was my graph became a big black box. I can understand why this is, but perhaps it's a good modification to suggest for participants to see if they understand why the change is so dramatic.

It might be valuable to add a discussion question to this lesson on why a sqrt scale is used with the population. Visually, the area of the circle and not the radius is what represents the information to the viewer, but there is no area attribute to set with the circle, hence why we use the root relationship with the radius. This is more of a general data visualization point than anything to do with D3, but since D3 can only produce visualizations as meaningful as the user's understanding of the information, I think it's still a relevant point to this lesson.

#### 09 - D3 Add and Remove

It's not immediately clear where the `<label>` element is supposed to be added, so I simply added it below the chart area.

The structuring of the lesson makes it seem as if `dot.exit().remove()` is to be added within the `else` clause of the checkbox callback, but the codeblock two exercises later shows where it's supposed to be. It would help to be more specific about where these lines of code are supposed to be and when they're being moved.

At this point, none of the lessons include instructions for what should be in the `main.css` file, so the final plot does not resemble the one given at the bottom of the webpage, mainly differing in the lack of outline and clunky looking axes.

Two lines in this section are used to initialize the `filtered_nations` variable, and it's not clear whether or not the later definition is meant to replace the first one, which only captures the nations with population over 10000000.

I'm still a relative newbie at JavaScript, so originally I didn't realize the `update()` function should be defined inside the anonymous function doing everything else. This causes problems because the `data_canvas` variable is inaccessible if it's defined elsewhere.

When reusing pieces of code, such as when we move the `enter()` and `exit()` calls to `update()`, it's helpful to highlight the small changes in someway. For example, I figured out that I hadn't changed `nations` to `filtered_nations` after an inordinate amount of time debugging. Of course, I could have avoided this if I'd just copy and pasted the code, but I find hand coding the exercises to be much more informative.

#### D3 - Transitions

The indices in my file are quite different from the ones in the expected file. While all the values have indices corresponding to 1950-2008, the outside years are irregular. I dealt with this manually in the indices for income, life expectancy, and population. It was at this point that I got a copy of the reformatted `nations.json`, so the commentary may be a little different from here on out.

The eventlisteners for `mouseover` events added to the call to `enter()` could be formatted a little better. In my file, I just moved the `.style()` calls to a separate extra-indented line for readability and shorter lines..

Even though averaging probably isn't a difficult task for most participants, the code block for returning `averaged_data` is a bit much when not broken up with comments or sections. Visually, some syntax highlight might be nice, if it can be added to the SWC templates.

For the final section, using the averages to add crosses at the appropriate places on the data canvas, I didn't know anything about the svg `path` element, so I found out how to do it by looking at the source of the page in Chrome's dev console.

Instead of going with the `path` approach, I decided to overlap two rectangles that formed a cross, manually figuring out the best height and width for each. Although I found this conceptually simpler, I had problems grouping two sets of rectangles, for the vertical and horizontal components of the crosses, into a single object that could be modified with one `enter` or `exit` command.

After spending a couple of hours off and on with the above conceptualization, I stumbled on Mike Bostock's page about the `d3.svg.symbol` library and its cross function. It would have helped a lot sooner to have a link to [this page](https://github.com/mbostock/d3/wiki/SVG-Shapes). I left a commit in my git history of how I was attempting to solve the problem with two rectangles, just so future references can see how horribly I went wrong.

After implementing the above step, the style of my crosses looks quite different from the lessons. I'm not sure if this is just because I haven't set an attribute that was set in the lesson's example or if the lesson actually didn't use the `d3.svg.symbol` set.

~~Despite updating my `styles.css`, the changes don't seem to affect the axis labels or style. I suspect this is because the data canvas is made after the css stylesheet is loaded and the data canvas is not interpreting the changes for some reason.~~

Ignore that last comment. I had a typo in how I linked to the stylesheet in my `<head>` element. I'mma dolt.

Ultimately got bored messing around trying to make the CSS work, so I copied the `main.css` from the SWC repo and made some minor edits.

#### Final Thoughts

I thought this was a very well constructed lesson, and I learned quite a bit from working through it on my own. Things would have obviously gone much more quickly if I were working on this alongside other participants and instructors. Other than the possible stylistic changes mentioned above, the only section where I felt a drop in quality was in the very last section, where large blocks of code were dropped with little build-up or in-line comments, which differed from the very thorough walk-through of the builds up until that point. To make it easier for participants to build on what they've learned and know where to go, I think more side-notes with linkouts to other references for elements, functions, or libraries they may be interested in knowing about. There are some places where it's mentioned what other properties or options can be used, instead of the ones given, but this aspect could certainly be augmented in order to make it easier to branch out.

In addition, I would love to see D3 lessons using alternative data. I'll definitely be looking for places to do this myself. If other web technologies useful to science besides D3 are added, perhaps the first half of this module could be used as a foundation/requisite module before moving onto other web packages.

-Grant