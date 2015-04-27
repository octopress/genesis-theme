require 'octopress-ink'
require 'octopress-linkblog'
require 'octopress-autoprefixer'
require 'octopress-date-format'
require 'octopress-comment-tag'
require 'octopress-wrap-tag'
require 'octopress-assign-tag'
require 'octopress-return-tag'
require 'octopress-include-tag'
require 'octopress-content-for'
require 'octopress-filter-tag'
require 'octopress-paginate'
require 'octopress-social'
require 'octopress-littlefoot'

require 'octopress-genesis-theme/version'

Octopress::Ink.add_theme({
  name:          "Octopress Genesis Theme",
  gem:           "octopress-genesis-theme",
  path:          File.expand_path(File.join(File.dirname(__FILE__), "../")),
  version:       Octopress::Genesis::VERSION,
  source_url:    "https://github.com/octopress/genesis-theme",
  description:   "A minimalist theme for Jekyll sites build on Octopress Ink"
})
