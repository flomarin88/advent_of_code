// HTML au format de adventofcode.com (structure réelle, contenu abrégé).
export const part1Page = `<main>
<article class="day-desc"><h2>--- Day 1: Trebuchet?! ---</h2>
<p>For example:</p>
<pre><code>1abc2
pqr3stu8vwx
a&lt;1b2c3d4e5f
treb7uchet
</code></pre>
<p>Values are <code>12</code>, <code>38</code>. Adding these together produces <code><em>142</em></code>.</p>
</article>
<form method="post" action="1/answer"></form></main>`

export const part2Page = `<main>
<article class="day-desc"><h2>--- Day 1: Trebuchet?! ---</h2>
<pre><code>1abc2
</code></pre><p>produces <code><em>142</em></code>.</p></article>
<p>Your puzzle answer was <code>54630</code>.</p>
<article class="day-desc"><h2 id="part2">--- Part Two ---</h2>
<pre><code>two1nine
<em>eight</em>wothree
</code></pre>
<p>Adding these together produces <em><code>281</code></em>.</p></article>
</main>`

export const wrongHigh = `<main><article><p>That's not the right answer; your answer is too high.  If you're stuck, make sure you're using the full input data; there are also some general tips on the <a href="/2023/about">about page</a>, or you can ask for hints on the <a href="https://www.reddit.com/r/adventofcode/" target="_blank">subreddit</a>.  Please wait one minute before trying again. <a href="/2023/day/1">[Return to Day 1]</a></p></article></main>`
export const wrong5min = `<main><article><p>That's not the right answer.  Please wait 5 minutes before trying again.</p></article></main>`
export const tooSoon = `<main><article><p>You gave an answer too recently; you have to wait after submitting an answer before trying again.  You have 1m 3s left to wait. <a href="/2023/day/1">[Return to Day 1]</a></p></article></main>`
export const correct = `<main><article><p>That's the right answer!  You are <span class="day-success">one gold star</span> closer to restoring snow operations. <a href="/2023/day/1#part2">[Continue to Part Two]</a></p></article></main>`
export const done = `<main><article><p>You don't seem to be solving the right level.  Did you already complete it? <a href="/2023/day/1">[Return to Day 1]</a></p></article></main>`
