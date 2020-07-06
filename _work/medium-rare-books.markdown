---
layout: work
order: 1
title:  Medium Rare Books
tags: ['web', 'type']
year: "2018"
client:	Intercom
image: .webm
theme: white
---

<header class="header sm-container lg:w-5/6 lg:pl-10 xl:pl-20">
  <a href="https://intercombrand.studio/" class="block text-center image mb-10">
      <div class="bg-black">
        <svg class="inline-block" width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.57136 6H6.4285V4.0714C6.4285 3.00628 5.56505 2.14283 4.49993 2.14283C3.43481 2.14283 2.57136 3.00628 2.57136 4.0714V6ZM1.28564 6C0.575596 6.00004 0 6.57566 0 7.28571V11.7143C0 12.4244 0.575634 13 1.28571 13H7.71429C8.42437 13 9 12.4244 9 11.7143V7.28571C9 6.57563 8.42437 6 7.71429 6H7.71422V4.0714C7.71422 2.2962 6.27513 0.857117 4.49993 0.857117C2.72473 0.857117 1.28564 2.2962 1.28564 4.0714V6Z" fill="white"/>
        </svg>
        <div class="inline-block caption text-white leading-none py-3">https://intercombrand.studio/</div>
      </div>
      <video class="inline-block max-w-full" autoplay="autoplay" loop>
        <source src="{{ site.images }}/{{ page.title | slugify }}/hero.mp4" type="video/mp4">
        <source src="{{ site.images }}/{{ page.title | slugify }}/hero.webm" type="video/webm">
      </video>
    </a>
    <h1 class="text-center mb-5 mega" itemprop="name headline">{{ page.title }}</h1>
    <p class="text-center caption mb-5">{{ page.client }} {{ page.year }}</p>
    <p class="text-center subhead mb-5">The Medium Rare Books Library began in early 2018 with the acquisition of a selection of rare books from Dave Cuzner, Founder and Senior Editor at <a class="squiggle" href="https://grainedit.com/">Grain Edit</a> for the Intercom Brand Studio. Our brand director, Stewart Scott-Curan, started the library to help the team get better at critically assessing what elements should and should not influence their work. Our experience with the library inspired us to better organize and make available that material online.</p>
    <div class="block text-center mx-auto lg:w-2/3 mb-10">
      <dl>
      <dt class="inline caption">My contributions</dt>
      <dd class="inline body">layout, type design, icons, web dev</dd>
      </dl>
      <dl>
      <dt class="inline caption"><a href="{{site.KellyCarpenter}}">Kelly Carpenter</a></dt>
      <dd class="inline body">design, branding, art direction, illustration, photography</dd>
      <dt class="inline caption"><a href="{{site.MattYow}}">Matt Yow</a></dt>
      <dd class="inline body">design, dev assistance</dd>
      <dt class="inline caption"><a href="{{site.CarlyWright}}">Carly Wright</a></dt>
      <dd class="inline body">production</dd>
      </dl>
    </div>
</header>
<hr class="clouds w-full block lg:-mb-20 z-20 "/>
<section class="work sm-container w-full lg:rounded-lg lg:px-32 lg:py-20 lg:bg-grey z-10">
  <div class="pullquote text-center mb-5">Our new library of over 200 uncatalogued books was useless.</div>
  <div class="block text-center body mx-auto lg:w-2/3 mb-10">
     With day to day deadlines and priorities, nobody had the energy to get some casual color inspo by laboring through the mammoth collection. That problem definitely needed to be solved, but we thought we could go a little above and be cool about it? From the beginning, Kelly was scoping more than just a website.
  </div>
  <img class="max-w-full image mx-auto lg:w-2/3 mb-10" src="{{ site.images }}/{{ page.title | slugify }}/build-sheet.png">
  <div class="flex mb-10">
    <div class="text-center w-1/2 mr-6">
      <img class="max-w-full image" src="{{ site.images }}/{{ page.title | slugify }}/photoshoot-1.jpg">
    </div>
    <div class="text-left w-1/2 ml-6">
      <div class="body mb-5">We tried using each book's unique ISBN and the OpenLibrary API to populate the cover image for our database, but quickly learned very few of our books had ISBNs, and the ones that did were <strong>so rare</strong> that no scan of the cover existed (even outside of the APIs!).</div>
      <img class="max-w-full image mb-5" src="{{ site.images }}/{{ page.title | slugify }}/betty-crocker-3.jpg">
      <div class="body">And what's a design library without visuals! Kelly scouted some props a-la the 1950s Betty Crocker cookbook in our new collection, and she and Matt got to the task of shooting the 200+ covers with two interior shots each.</div>
    </div>
  </div>
  <div class="caption text-center mb-5 mt-20">
    Custom type
  </div>
  <div class="pullquote text-center mb-20">Even on clientless projects, it's hard to justify custom type. But when you're building a database of books, it's hard to ignore custom type as an easy win for unifying an almost entirely typographic database.</div>
  <div class="flex mb-10">
    <div class="text-center w-1/2 image px-10 py-8 mr-6">
      <div class="caption mb-5">Medium Rare Sans Light</div>
      <img class="max-w-full" src="{{ site.images }}/{{ page.title | slugify }}/medium-rare-sans-light.png">
    </div>
    <div class="text-center w-1/2 image px-10 py-8 ml-6">
      <div class="caption mb-5">Medium Rare Sans Bold</div>
      <img class="max-w-full" src="{{ site.images }}/{{ page.title | slugify }}/medium-rare-sans-bold.png">
    </div>
  </div>
  <div class="block text-center body mx-auto lg:w-2/3 mb-10">
     What started as a complementary headline font ended up a small typographic village. The goal of Medium Rare Sans was simple enough: feel rare, feel like a local used book store lost gem. Unusual proportions, overbites (see a), underbites (see g), flat bottomed t's and y's, and diamond dots all contribute to that feel. But the site was getting loaded with content, and diamond dots weren't gonna solve our hierarchy problem. The system needed something that could get small. Teaming up with <a class="squiggle" href="https://www.futurefonts.xyz/inga-plonnigs/messer">Messer</a> for body text, Medium Rare Caption became the bedrock of ignorable copy.
  </div>
  <div class="flex mb-10 image">
    <div class="text-center w-1/2 ml-10 mr-5 my-8">
      <div class="caption mb-5">Medium Rare Caption</div>
      <img class="max-w-full" src="{{ site.images }}/{{ page.title | slugify }}/intercom-fucked-small-1.png">
    </div>
    <div class="text-center w-1/2 mr-10 ml-5 my-8">
      <div class="caption mb-5">Medium Rare Caption</div>
      <img class="max-w-full" src="{{ site.images }}/{{ page.title | slugify }}/intercom-fucked-small-2.png">
    </div>
  </div>
  <div class="flex items-center mb-10">
    <div class="image bg-white w-1/2 mr-6">
      <img class="max-w-full  px-10 py-8" src="{{ site.images }}/{{ page.title | slugify }}/fucked-small.png">
      <img class="max-w-full" src="{{ site.images }}/{{ page.title | slugify }}/ingredients.png">
    </div>
    <div class="text-left w-1/2 ml-6">
    <div class="body mb-5">
      Caption included some good ol' unicode icons for common data attached to each title: author, ISBN, date, and publisher. Behind the scenes, our yml database file was tracking 9 data points, but many proved to less than interesting to display.
    </div>
      <div class="body mb-5">
        Caption wasn't set bigger than 12px, but still shared the brief with Sans of needing to feel exciting, lost, fumbled, fumbled again, recovered! Touchdown!
      </div>
      <div class="body mb-5">
        It also needed to...
      </div>
      <div class="body mb-5 ml-10">
        ahem
      </div>
      <div class="body mb-5 ml-20">
        feel like a cookbook.
      </div>
    </div>
  </div>
  <div class="text-center w-full image px-10 py-8 mb-10">
    <div class="caption mb-5">Icons (LTR): Author, ISBN, Date, Publisher</div>
    <img class="max-w-full" src="{{ site.images }}/{{ page.title | slugify }}/icons.png">
  </div>
  <div class="caption text-center mb-5 mt-20">
    Custom type
  </div>
  <div class="pullquote text-center mb-20">Even on clientless projects, it's hard to justify custom type. But when you're building a database of books, it's hard to ignore custom type as an easy win for unifying an almost entirely typographic database.</div>
  <video class="inline-block image max-w-full" autoplay="autoplay" loop>
    <source src="{{ site.images }}/{{ page.title | slugify }}/collage.gif" type="video/gif">
    <source src="{{ site.images }}/{{ page.title | slugify }}/collage.webm" type="video/webm">
  </video>
</section>
