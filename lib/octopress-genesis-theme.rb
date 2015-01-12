require 'octopress-ink'
require 'octopress-linkblog'
require 'octopress-autoprefixer'
require 'octopress-date-format'
require 'octopress-comment-tag'
require 'octopress-wrap-tag'
require 'octopress-abort-tag'
require 'octopress-assign-tag'
require 'octopress-return-tag'
require 'octopress-include-tag'
require 'octopress-content-for'
require 'octopress-filter-tag'

require 'octopress-genesis-theme/version'
require 'octopress-genesis-theme/category-generator'

Octopress::Ink.add_plugin({
  name:          "Octopress Genesis Theme",
  gem:           "octopress-genesis-theme",
  path:          File.expand_path(File.join(File.dirname(__FILE__), "../")),
  type:          "theme",
  version:       Octopress::Genesis::VERSION,
  source_url:    "https://github.com/octopress/genesis-theme",
  description:   "A minimalist theme for Jekyll sites build on Octopress Ink"
})

