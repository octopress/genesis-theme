# Octopress Genesis (A work in progress)

A new theme build on Octopress Ink. 

[![Gem Version](http://img.shields.io/gem/v/octopress-genesis-theme.svg)](https://rubygems.org/gems/octopress-genesis-theme)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://octopress.mit-license.org)

Note: This theme is in alpha development. What's left to do? See [the issues](https://github.com/octopress/genesis-theme/issues/).

## Installation

If you're using bundler add this gem to your site's Gemfile in the `:jekyll_plugins` group:

    group :jekyll_plugins do
      gem 'octopress-genesis-theme'
    end

Then install the gem with Bundler

    $ bundle

To install manually without bundler:

    $ gem install octopress-genesis-theme

Then add the gem to your Jekyll configuration.

    gems:
      - octopress-genesis-theme

## Usage

This is best demonstrated on a new Jekyll site:

- Create a new Jekyll site.
- Add some posts or pages.
- Ensure that posts have the layout `theme:post`, and pages `theme:page`
- Run `jekyll serve` and check it out.

## Configuration

To configure this theme, create a `_plugins/theme/config.yml` and add your settings. Here are
the defaults.

```yaml
# Settings for main header
title: My Octopress Blog
subtitle:
 
# Links for main navigation
main_nav:
  - { url: '/', title: 'Posts' }
  - { url: '/archive/', title: 'Archive' }
  - { url: '/feed/', title: 'Subscribe' }

# Link labels
permalink_label: "Permalink"
read_more_label: "Continue Reading →"

# Show excerpts on post index
excerpt_posts: true
# Excerpt linkposts on index
excerpt_linkposts: false

search: google

sharing:
  - facebook
  - twitter
  - gplus
  - email

# Defaults to sharing with links (for speed and privacy)
# To use javascript share buttons, set share_with: buttons
share_with: links

# Embed comments, options: false, facebook, disqus
comments: false

# Center the text in post and page headings.
center_headings: true
```

You can also easily overwrite stylesheets, layouts, partials and basically everything about
this plugin by adding a copy of that file in the `_plugins/theme` directory. More on that
later.

## Multilingual Support

If you're going to be building a multilingual site, be sure to
install [octopress-multilingual](https://github.com/octopress/multilingual) and this theme will automatically generate language specific pages for your:

- Posts index
- Archive page
- Category indexes (if you use them)
- Tag indexes (if you use them)

Also you will be able to set theme configurations for each language.
For example to configure theme settings for your German pages,
you'd create a `_plugins/theme/config_[lang].yml` and add
whatever settings you want to override.

## Contributing

1. Fork it ( https://github.com/octopress/genesis-theme/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
