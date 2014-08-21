require 'octopress-ink'
require 'octopress-linkblog'
require 'octopress-autoprefixer'
require 'octopress-date-format'
require 'octopress-comment-tag'
require 'octopress-wrap-tag'
require 'octopress-return-tag'
require 'octopress-include-tag'
require 'octopress-content-for'
require 'octopress-filter-tag'

require 'octopress-genesis/version'
require 'octopress-genesis/category-generator'

Octopress::Ink.add_plugin({
  name:          "Octopress Genesis",
  slug:          "theme",
  assets_path:   File.expand_path(File.join(File.dirname(__FILE__), "../assets")),
  type:          "theme",
  version:       Octopress::Genesis::VERSION,
  description:   "",
  website:       ""
})


