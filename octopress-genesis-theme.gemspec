# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'octopress-genesis-theme/version'

Gem::Specification.new do |spec|
  spec.name          = "octopress-genesis-theme"
  spec.version       = Octopress::Genesis::VERSION
  spec.authors       = ["Brandon Mathis"]
  spec.email         = ["brandon@imathis.com"]
  spec.summary       = %q{A Jekyll theme built on Octopress Ink}
  spec.homepage      = "https://github.com/octopress/genesis-theme"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").grep /(lib|assets|README\.md|CHANGELOG\.md)/
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_runtime_dependency "octopress-ink", "~> 1.0"
  spec.add_runtime_dependency "octopress-linkblog"
  spec.add_runtime_dependency "octopress-date-format"
  spec.add_runtime_dependency "octopress-paginate"
  spec.add_runtime_dependency "octopress-autoprefixer"
  spec.add_runtime_dependency "octopress-wrap-tag"
  spec.add_runtime_dependency "octopress-assign-tag"
  spec.add_runtime_dependency "octopress-filter-tag"
  spec.add_runtime_dependency "octopress-comment-tag"
  spec.add_runtime_dependency "octopress-quote-tag"
  spec.add_runtime_dependency "octopress-social"
  spec.add_runtime_dependency "octopress-littlefoot"
  spec.add_runtime_dependency "sass", "~> 3.4"
  spec.add_runtime_dependency "jekyll", ">= 2.0"

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "octopress"
  spec.add_development_dependency "clash"

  if RUBY_VERSION >= "2"
    spec.add_development_dependency "octopress-debugger"
  end
end
