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
  spec.description   = %q{A Jekyll theme built on Octopress Ink}
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").grep /(lib|assets|README\.md|CHANGELOG\.md)/
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_runtime_dependency "octopress-ink"
  spec.add_runtime_dependency "octopress-linkblog", "~> 1.0"
  spec.add_runtime_dependency "octopress-date-format", "~> 2.0"
  spec.add_runtime_dependency "octopress-autoprefixer", "~> 1.0"
  spec.add_runtime_dependency "octopress-wrap-tag", "~> 1.0"
  spec.add_runtime_dependency "octopress-abort-tag", "~> 1.0"
  spec.add_runtime_dependency "octopress-assign-tag", "~> 1.0"
  spec.add_runtime_dependency "octopress-filter-tag", "~> 1.0"
  spec.add_runtime_dependency "octopress-comment-tag", "~> 1.0"
  spec.add_runtime_dependency "octopress-return-tag", "~> 1.0"
  spec.add_runtime_dependency "octopress-content-for", "~> 1.0"

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "octopress"
  spec.add_development_dependency "clash"
  spec.add_development_dependency "pry-byebug"
end
