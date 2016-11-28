# Memoirable
> Online diary for all

[![Join the chat at https://gitter.im/coderuse/memoirable](https://badges.gitter.im/coderuse/memoirable.svg)](https://gitter.im/coderuse/memoirable?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/coderuse/memoirable.svg?branch=master)](https://travis-ci.org/coderuse/memoirable)

###### [Site](https://coderuse.github.io/memoirable)

### Contents

- [Overview](#overview)
- [Future Plan](#future-plan)
- [Current Release](#release-notes)
- [Support](#support)
- [Contribute](#contribute)
- [Documentation](#documentation)
- [Team](#team)
- [License](#license)

### Overview

We believe that, everyone should keep their experiences to meet new friends, starting new relations, having a bad day, having the most memorable day in a written format. In one's own language and with own feelings. And this written notes should not be lost. One of the problems in preserving paper diaries.

For this reason, we are building this. For you, for us. We can also pass these journals to future generations.

And of course this should remain free and private.

This app will use known and popular free storage providers like Google Drive, Microsoft OneDrive to store data and will be hosted on Github pages. So, as long as you can remember the password of your Storage provider's account, your journal will be accessible for you. And ofcourse it will remain for your own eye only.

### Future Plan

Later we may add some features like:

- Pass selective journal entries to another user
- Make a backup of your journal to local disk and restore from there. So that, you can keep your journal more safe and more personal

### Release Notes

#### Release notes for version 0.1

In this first release of this diary, we have tried our best to keep it bug free as far as possible.

##### Features

- This release will be compatible with all the later releases. That means, any entry created with this release will be available and usable in later releases
- Google Drive is supported as the only storage provider. User need to give the [permission for application data folder](https://developers.google.com/drive/v3/web/appdata). [More details](https://developers.google.com/drive/v2/web/scopes)
- Multiple entries for a date is possible
- Entries for future date is possible
- Buttons for **Bold** & *Italics* are available in the editor. As we are using [CommonMark](http://commonmark.org/) compatible renderer, all the tags available for `CommonMark` will be available for the writing. [referrence](http://spec.commonmark.org/0.27/)

##### Disclaimer

We have only manually tested this application. No unit tests and automated end-to-end tests have been added in this release. Those are planned for future releases.

### Use this in your own site

``` bash
git clone https://github.com/coderuse/memoirable.git
npm install -g grunt-cli typescript typings
npm install
```

Follow the [steps](https://developers.google.com/drive/v2/web/auth/web-client#create_a_client_id_and_client_secret) to create a client id for the app and change the `clientId` in `src/app/constants.ts`.

Also installation of `Ruby` is required.

``` bash
gem install sass susy normalize-scss
grunt build
```

### Support

- [GitHub Issues](https://github.com/coderuse/memoirable/issues)
- [Gitter Chat](https://gitter.im/coderuse/memoirable)

### Contribute

This project is at a very initial stage. So, it's the right time to show your love for Open Source Development and be a part of the core team for this awesome project.

So, fork it, follow the [above steps](#use-this-in-your-own-site) and invoke `grunt` to spawn a dev server with watch over the dev file changes.

### Documentation

An auto generated doc is hosted at https://coderuse.github.io/memoirable

### Team

[![Arnab Das](https://avatars3.githubusercontent.com/u/1061389?v=3&s=130)](http://coderuse.com)|[![Chandan Kr Jha](https://avatars3.githubusercontent.com/u/13062613?v=3&s=130)](http://chandankrjha.com)
---|---
[Arnab Das](http://coderuse.com)|[Chandan Kr Jha](http://chandankrjha.com)

### License

```
Copyright 2016 Arnab Das <arnab@coderuse.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
