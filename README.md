# Octopress Genesis (A work in progress)

A new theme build on Octopress Ink. 

Note: This theme is in alpha development. What's left to do? See [the issues](https://github.com/octopress/genesis-theme/issues/).

## Installation

Add this line to your application's Gemfile:

    gem 'octopress-genesis-theme'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install octopress-genesis-theme

Next add it to your gems list in Jekyll's `_config.yml`

    gems:
      - octopress-genesis-theme

## Usage

This is best demonstrated on a new Jekyll site:

- Create a new Jekyll site.
- Add some posts or pages.
- Ensure that posts have the layout `theme:post`, and pages `theme:page`
- Run `jekyll server` and check it out.

## Configuration

To configure this theme, create a `_plugins/theme/config.yml` and add your settings. Here are
the defaults.

```yaml
# Settings for main header
title: My Octopress Blog
subtitle: A clever subtitle (optional)
 
# Links for main navigation
nav:
  - { url: '/', title: 'Home' }
  - { url: '/archive', title: 'Archive' }
  - { url: '/feed', title: 'RSS' }

# Settings for category index generator
category:
  prefix: Category
  url:    category

post_index:
  excerpt_posts: true
  permalink_label: "Permalink"
  read_more_label: "Continue Reading &rarr;"

# Center the text in post and page headings.
center-headings: true
```

You can also easily overwrite stylesheets, layouts, partials and basically everything about
this plugin by adding a copy of that file in the `_plugins/theme` directory. More on that
later.

## Contributing

1. Fork it ( https://github.com/octopress/genesis-theme/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
