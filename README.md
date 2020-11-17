# schroeder-cite - Mick Schroeder's Citation Generator

![Screenshot](https://github.com/mick-schroeder/schroeder-cite/raw/master/src/static/images/schroeder-cite.gif)

Overview
--------
Free and open-source software that automatically suggests citations and helps write a bibliography for you. Forked from [zotero/bib-web](https://github.com/zotero/bib-web).


Prerequisites
------------

1. Node JS with npm
1. Basic Mac or Linux command-line tools including rsync
1. Existing translation-server, bib-server, styles-repo

Local Development version
----------

Getting The Library

1. `git clone --recursive git@github.com:mick-schroeder/schroeder-cite.git`

1. `cd schroeder-cite`

1. `npm install`

1. `npm run start`

This will serve demo on http://127.0.0.1:8001. 

You might need to provide configuration options (see below) in order to get storage and translation to work. 

By default, the development server **proxies translations server requests to localhost:1969**. If your server is located elsewhere you need to provide the url, e.g. the last step above would look like this:

1. `npm start --zotero-bib-web:translation_server="http://localhost:1234"`

This will proxy requests from the browser to the specified translation server.

Using in Production
-------------------

To obtain production-ready files use the following npm command:

`npm run build`

Configuration
-------------

It's possible to provide configuration parameters for the build (both in development and production) using configuration files and/or environment variables. The easiest way is to copy `config/default.json` to `config/local.json` and place variables there (this file is git ignored and should not be committed). Alternatively environment variables listed in `config/custom-environment-variables.json` can be used. For more details how to provide configurations, see [config npm package](https://github.com/lorenwest/node-config).

Configuration options
--------------

The following configuration options are accepted:

**storeURL**
Specifies url for the *bib-server* api where bibliographies are stored. 

**stylesURL**
Specifies url for the *styles-repo* website. When left empty, default will be used which is https://www.zotero.org/styles-files/styles.json

**translatePrefix**
Specifies an additional prefix for where translation server request should be send. Useful in cases where `translateURL` is left empty so that it's possible to direct requests to a specific endpoint at wherever zotero-bib is being hosted.

**translateURL**
Specifies url for the *translation-server*. By default current host is assumed to proxy request to the translation server.
