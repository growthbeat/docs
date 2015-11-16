> :page_facing_up: Documentation for Growthbeat

[![wercker][wercker-badge]][wercker-link]
[![MIt License][mit-badge]][mit]

<br>

<p align="center">
<img src="https://dl.dropboxusercontent.com/u/74344418/github-image/docs.png" width="700" />
</p>

<p align="center">
  <b><a href="#setup">Setup</a></b>
  |
  <b><a href="#building">Building</a></b>
  |
  <b><a href="#usage">Usage</a></b>
  |
  <b><a href="#whats-included">What's included</a></b>
  |
  <b><a href="#development">Development</a></b>
</p>


## Setup

**Required software**

* Go (>= v1.5): http://golang.org/
* Hugo (>=v0.14) : http://gohugo.io/
* Node.js (>=10.0) : https://nodejs.org/


## Building

This documentaion site is powerd by [Hugo](http://gohugo.io/) hosted on [Github Pages](https://pages.github.com/). To build a Hugo site you'll need to setup Golang and Hugo environment on your system. Please see [Setup](#setup), If you are not familiar with Hugo, please check the [Hugo quickstart guide](https://gohugo.io/overview/quickstart/).

Follow these steps to build Hugo site on your system:

```bash
$ git clone git@github.com:growthbeat/docs.git
$ cd docs
$ npm run bootstrap
$ npm start
```


## Usage

**Write a new article**

Follow these steps to post a new article:

```bash
# Write an article
$ npm run post <File Name>.md
/path/to/docs/content/<File Name>.md created
# Writing
# commit
$ git add .
$ git commit -m "message"
$ git push
```

**Update an article**

After updating existing article in content, please change `date`. It is used as update date in this site.


## Deployment

This blog uses wercker to deploy `public` to `gh-pages` branch automatically so you do not have to do it yourself. If you would like to know this configuration, please see `wercker.yml`. If you are not familiar with wercker, please check the [wercker quickstart guide](http://devcenter.wercker.com/quickstarts/index.html).


## Development

1. Fork it ( https://github.com/[my-github-username]/docs/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, IT is maintained under [the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.


## License

[MIT][mit] © [SIROK, Inc][sirok]

Whenever code for bdash is borrowed or inspired by awesome existing sources, we credit the original developer, designer or article in our code. Please create [issues][issue] if you think any credit is absent.


[sirok]:          http://sirok.co.jp/
[mit]:            https://github.com/growthbeat/docs/blob/master/LICENSE.md
[mit-badge]:      https://img.shields.io/github/license/growthbeat/docs.svg?style=flat-square
[wercker-badge]:  https://img.shields.io/wercker/ci/growthbeat/docs.svg?style=flat-square
[wercker-link]:   https://app.wercker.com/#applications/55e7187dc0d66d1e600cf4c1
