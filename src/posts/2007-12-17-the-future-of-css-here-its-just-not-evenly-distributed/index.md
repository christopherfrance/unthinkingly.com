---
kind: article
created_at: 2007-12-17 00:37:41
title: The Future of CSS is Here .... It's Just Not Evenly Distributed
excerpt: "a teensy, non-brilliant-but-incredibly-useful DIY hack for stylesheets."
tags: [css, ruby, dry]
modified_on: 2009-01-30 10:46:09
status: publish 
path: /2007/12/17/the-future-of-css-here-its-just-not-evenly-distributed
---

In light of the <a href="http://www.stuffandnonsense.co.uk/malarkey/more/css_unworking_group/">litigious, melodramatic backwater that the CSS spec has fallen into</a>, I thought it would be worth writing up a teensy, non-brilliant-but-incredibly-useful DIY hack for stylesheets.

<img src='/static/images/future-is-now-slate.jpg' alt='The future is now' />In my mind, there is really no way of getting around CSS if you are working on the web. CSS makes your site ugly or beautiful, rendering a site in just a split second of processing right before your retinas pass information to your brain. I love it; it's one of my trustiest tools. Back in the day I did enough hard time with tables and inline FONT and MARGIN stuff that CSS really was a revelation for me.

So yeah, CSS, I love you, even if you are spooky and crusty and awkward sometimes. And did I mention annoying? Ok sometimes REALLY annoying. ... Sometimes it's late, stuff's completely hosed by SOMETHING in this bloated stylesheet, and I realize that I've just learned to survive on CSS island with a sturdy coconut helmet and strong superstitions about absolute positioning or a negative margin or that extra wrapper div.

That's mostly Microsoft's fault, but besides all the browser bugs, it's really a pretty dumb language. Seriously, what does it take to do a just bit of real vertical positioning without total hackery? And aren't computers good at this whole MATH thing? So why can't I do 

```css
p { width:(100% - 40px); }
```

Huh? I'm talking to you, CSS. I would break up with you if my salary didn't depend you. 

ANYWAY, there's a good open source philosophy that goes something like "don't bitch without a better idea" so here's three issues that have a solution that I'd like to humbly point out actually have an existing solution. 

<h2>First, The Solution:</h2> Parse your stylesheets on the server! You can do this in all kinds of languages and frameworks. Hell, you could even do it client-side with javascript if you really wanted to, but for my purposes I'm banging on Ruby on Rails and have fallen in love with the <a href="http://blog.airbladesoftware.com/2006/12/11/cssdryer-dry-up-your-css">CSS Dryer Plugin</a> which processes the stylesheet dynamically with ERB. (NOTE: READ THAT THERE FULL POST BEFORE JUMPING IN, COWBOY. There's an important bug with comments in blocks.) 

This is decidedly a Not New Idea. But for some reason it's Just Not Done among most of the developers I work with, who I guess are probably also wearing coconut helmets and carrying around good luck charms. 

And, let me tell you, this is decidedly one hack that I no longer am without. As long as you are already proficient with CSS it takes about an hour to figure it out, and then you will never look back. Seriously. This is a good one. I don't often write much technical stuff here.

Here are the gigantic CSS annoyances that server-side CSS parsing solves for me:

<h2>Problem 1: No Variables!</h2>
This is a trivial problem really when you start parsing your stylesheet. Most useful for setting a few color variables at the top of the sheet, then you can swap out palettes sitewide. Whiz Bang! Reason enough.

<h2>Problem 2: Ridiculous Redundancy</h2>
A decent stylesheet has some degree of scope, which makes your stylesheet more readable and your styles most contextual. That is, instead of just saying 

```css
p {color:fuchsia;}
``` 

It really is best to have something more specific like:

```css
div.column p {color:fuchsia;}
```

But then when you have to repeat the contextual selector (the stuff in front of the p element) every time. So CSS Dryer lets you turn this: 

```css
body#homepage div.column p {color:fuscia;}
body#homepage div.column p span {color:black;}
```

into this: 

```css
body#homepage 
    div.column {
        p {color:fuscia;
            span {color:black;}
        }
    }
}
```

WOOO! This is completely DRY code that renders into exactly the same thing as above before it hits the browser. So this example actually adds a few lines, sure, and it looks more complicated at first, but trust me, this is MONEY. On a stylesheet for a decent size application I ended up with about 25% fewer lines. This is great and all, but the real benefit of having every style nested in its proper context is actually solving ...

<h2>Problem 3: Stylesheets Get Really Bloody Complicated for Big Sites and Teams</h2> 
Have you ever been on deadline and cranked out a big stylesheet at 3am and then had to come back to it in a month and actually make a tiny change, only to realize that hey, look, it seems like this should work, but somehow the damn padding on this div is being set in three places, and when I fix it the good and proper way just makes things go ALL to hell and now for some reason I've got to put <em>negative freaking margin</em> on this thing but it looks right so I guess I better get back to real work? I hate that. I write bad CSS. A lot. I'm busy and dumb. And it's maybe that I'm just distractible and impatient but dammit I'm gonna blame it on the fact that this stylesheet is HUGE and I'm tired and I can't Firebug this page enough to find all the relevant styles. You could also blame it on the other dorks on your team who don't use the same organizational rules that you've been using for years. 

Nested CSS fixes this junk COLD. Take an afternoon and rewrite the project you're on with nested CSS and you will have a stunning beauty of a stylesheet in which EVERYTHING has it's place. You feel like a samurai when you come back in a month. That style is set in ONE place. It won't save you from IE, but you feel like you're back in touch with the craft.