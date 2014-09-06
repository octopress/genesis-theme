# encoding: utf-8
#
# Jekyll category page generator.
# http://recursive-design.com/projects/jekyll-plugins/
#
# Version: 0.1.4 (201101061053)
#
# Copyright (c) 2010 Dave Perrett, http://recursive-design.com/
# Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
#
# A generator that creates category pages for jekyll sites.
#
# Included filters :
# - category_links:      Outputs the list of categories as comma-separated <a> links.
#
# Available theme/config.yml settings :
# - category:
#   url:          The subfolder to build category pages in (default is 'categories').
#   prefix:       The string used before the category name in the page title (default is 'Category').

module Jekyll

  # The CategoryIndex class creates a single category page for the specified category.
  class CategoryIndex < Page

    # Initializes a new CategoryIndex.
    #
    #  +base+         is the String path to the <source>.
    #  +category_dir+ is the String path between <source> and the category folder.
    #  +category+     is the category currently being processed.
    def initialize(site, base, category_dir, category)
      @site = site
      @base = base
      @dir  = category_dir
      @name = 'index.html'
      @config = Octopress::Ink::Plugins.config['theme']['category']
      self.process(@name)

      layout = @site.layouts['theme:category-index']
      self.content             = layout.content
      self.data                = layout.data
      self.data['category']    = category
      # Set the title for this page.
      self.data['title']       = "#{@config['title']}: #{category}"
      # Set the meta-description for this page.
      self.data['description'] = "#{@config['title']}: #{category}"
    end

  end

  # The CategoryFeed class creates an Atom feed for the specified category.
  class CategoryFeed < CategoryIndex

    # Initializes a new CategoryFeed.
    #
    #  +base+         is the String path to the <source>.
    #  +category_dir+ is the String path between <source> and the category folder.
    #  +category+     is the category currently being processed.
    def initialize(site, base, category_dir, category)
      super
      @name = 'index.xml'
      self.process(@name)
      layout = @site.layouts['theme:category-feed']
      self.content             = layout.content
      self.data                = layout.data
      self.data['category']    = category
    end

  end
  
  # The Site class is a built-in Jekyll class with access to global site config information.
  class Site

    # Creates an instance of CategoryIndex for each category page, renders it, and
    # writes the output to a file.
    #
    #  +category_dir+ is the String path to the category folder.
    #  +category+     is the category currently being processed.
    def write_category_index(category_dir, category)
      index = CategoryIndex.new(self, self.source, category_dir, category)
      index.render(self.layouts, site_payload)
      index.write(self.dest)
      # Record the fact that this page has been added, otherwise Site::cleanup will remove it.
      self.pages << index

    end

    # write 
    def write_category_feed(category_dir, category)
      # Create an Atom-feed for each index.
      feed = CategoryFeed.new(self, self.source, File.join(category_dir,'feed'), category)
      feed.render(self.layouts, site_payload)
      feed.write(self.dest)
      # Record the fact that this page has been added, otherwise Site::cleanup will remove it.
      self.pages << feed
    end

    # Loops through the list of category pages and processes each one.
    def write_category_indexes
      if self.layouts.key? 'theme:category-index'
        config = Octopress::Ink::Plugins.config['theme']['category']
        slug = config['dir']
        feeds = config['feeds']
        self.categories.keys.each do |category|
          self.write_category_index(File.join(slug, category), category) if slug
          self.write_category_feed(File.join(slug, category), category) if feeds && feeds.include?(category)
        end
      end

    end

  end


  # Jekyll hook - the generate method is called by jekyll, and generates all of the category pages.
  class GenerateCategories < Generator
    safe true
    priority :low

    def generate(site)
      site.write_category_indexes
    end

  end


  # Adds some extra filters used during the category creation process.
  module Filters

    # Outputs a list of categories as comma-separated <a> links. This is used
    # to output the category list for each post on a category page.
    #
    #  +categories+ is the list of categories to format.
    #
    # Returns string
    #
    def category_links(categories)
      categories = categories.sort!.map { |c| category_link c }

      case categories.length
      when 0
        ""
      when 1
        categories[0].to_s
      else
        "#{categories[0...-1].join(', ')}, #{categories[-1]}"
      end
    end

    # Outputs a single category as an <a> link.
    #
    #  +category+ is a category string to format as an <a> link
    #
    # Returns string
    #
    def category_link(category)
      dir = @context.registers[:site].config['category_dir']
      # TODO: URLize categories
      slug = File.join('/',
                       Octopress::Ink::Plugins.config['theme']['category']['dir'],
                       sluggify(category))
      "<a class='category' href='#{slug}/'>#{category}</a>"
    end

    # returns a string which is ready for urlizing.
    def sluggify(input)
      value = input.gsub(/[^\x00-\x7F]/u, '')
      value.gsub!(/[']+/, '')
      value.gsub!(/\W+/, ' ')
      value.strip!
      value.downcase!
      value.gsub!(' ', '-')
      value
    end
  end

end
