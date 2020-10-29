# Changelog

## [1.11.1](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.11.0...v1.11.1) (2020-10-29)


### Bug Fixes

* **dockerfile.apt:** fix typo [skip ci] ([afaa748](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/afaa748b613845e8362cd145fe758a19b1f08f5a))
* **Dockerfile.apt:** search/replace typo ([b110e13](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/b110e139eea07a1cc7cc8b5320c867636a8d917c))


### Documentation

* **readme:** rst formatting ([1230474](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/123047493f38effdb9a279a008509978632190f1))

# [1.11.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.10.0...v1.11.0) (2020-10-27)


### Features

* **fedora:** build Fedora 33 images ([934f57c](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/934f57c836543d3b85926a7043292f748bc3ac38))

# [1.10.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.9.0...v1.10.0) (2020-10-26)


### Bug Fixes

* **dockerfile.zyp:** fix/ignore hadolint violations ([4fe8d0b](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/4fe8d0b11f531736a6f360a599acd404b089e321))


### Features

* **3000.3:** build remaining images ([0077e57](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/0077e578c8a862e3f89b22e5ac38ab85bd5d343e))

# [1.9.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.8.1...v1.9.0) (2020-10-23)


### Features

* **magnesium:** add `3002.0` & fix `3001` => `3001.1` ([334fa83](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/334fa8322184b7091acf25ea11e3bbb403ae227c))

## [1.8.1](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.8.0...v1.8.1) (2020-10-15)


### Continuous Integration

* **gitlab-ci:** build latest Salt version for all remaining platforms ([7061a75](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/7061a75681e4dfc53322b0d6ed16d9b7ced9da4d))


### Tests

* **salt_version:** update for `tiamat` (now Magnesium `3002`) ([dc6d8d0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/dc6d8d0eaccc9e5a943891e1ea7e245e893e3340))

# [1.8.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.7.1...v1.8.0) (2020-10-12)


### Features

* **gentoo:** improve performance by enabling `emaint` ([844ec6d](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/844ec6dee01cd8e06b45906e81f7f058b3399a5e)), closes [/gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/-/merge_requests/55#note_427462634](https://gitlab.com//gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/-/merge_requests/55/issues/note_427462634)


### Tests

* **salt_version:** update for `master` (now Magnesium `3002`) ([6ab3387](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/6ab3387f03e4ca9722149f446f84f84a337980fb))

## [1.7.1](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.7.0...v1.7.1) (2020-10-08)


### Bug Fixes

* **dockerfile.yum:** update for new `hadolint` rules ([581a582](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/581a582c87c8f0e378e6f9f3080c6641d450c27a))

# [1.7.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.6.2...v1.7.0) (2020-10-02)


### Features

* **gentoo:** build Gentoo images ([fa1b62f](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/fa1b62f92ca5569e58bf48b249545df4235db50c))

## [1.6.2](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.6.1...v1.6.2) (2020-10-01)


### Bug Fixes

* **dockerfile:** ensure all build args are available after the `FROM` ([36b4274](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/36b4274ae9ace633a516ac5910d4096385081788))

## [1.6.1](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.6.0...v1.6.1) (2020-10-01)


### Bug Fixes

* **dockerfile:** restrict `/proc` grep inversion to root path [skip ci] ([ae1e20f](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/ae1e20f2c0380a617640cc11e1c0cf7d8194a455))

# [1.6.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.5.0...v1.6.0) (2020-09-19)


### Bug Fixes

* **dockerfile:** restrict `find` to `/usr/` for debug spam workaround ([88194c2](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/88194c2e0a58224194a794e7faa715302aa988bb))


### Code Refactoring

* apply consistent formatting and update comments ([c7dfc97](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/c7dfc9793df84fa720a618af9bd4210b8825a2fc))


### Continuous Integration

* **gitlab-ci:** deprecate `2019.2` ([2b755d9](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/2b755d9ca14a5d1e00dcbcbef5b213fe4734f798))


### Features

* **tiamat:** build images from SaltStack's Tiamat repo (artifactory) ([d435827](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/d435827228dc980fa5a2260ff1f15294823297dd))

# [1.5.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.4.1...v1.5.0) (2020-09-18)


### Features

* **dockerfile:** workaround debug spam breaking CI ([a2f383e](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/a2f383e2e44aba099d4583fc383b1ff335aac268))

## [1.4.1](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.4.0...v1.4.1) (2020-09-11)


### Code Refactoring

* **black:** apply `black` modifications ([87f6d01](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/87f6d01dac52d70a2e9491f6f7c99f20cb5948b7))


### Continuous Integration

* **gitlab-ci:** use `diff` as well as `check` for `black` ([ca543ca](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/ca543ca28dc3204aca481e7d477d868a57175e02))

# [1.4.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.3.0...v1.4.0) (2020-06-18)


### Bug Fixes

* **github:** add lockdown message to both issues and PRs  [skip ci] ([f175d5f](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/f175d5f2436bfdfa343c88a79d069a646d84ac28))
* **gitlab-ci:** use `upstream/master` for `commitlint` ([c6748ae](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/c6748ae2089123d6bed055c2f958eef8999367f3))


### Continuous Integration

* **gitlab-ci:** display `--version-report` for debug purposes ([dc4807f](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/dc4807f11d4080f4a46c5b3d4d56a173b1d96ac6))
* **travis:** add `3001` ([3953016](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/3953016bf3c5fcb49db7facc1d7f8b7a1642207b))
* **travis:** add `oraclelinux` ([d248645](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/d2486453e648f154a42ea776fdd0cfd62a0106bf))


### Features

* **sodium:** build images for `3001` ([0b90c54](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/0b90c5457572164210b629dc76e817213f16c835))


### Styles

* **gitlab-ci:** use node anchors for `stages` entries ([22bcb57](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/22bcb57ae8a5d14ce32f56379063d0b19be8bcc3))

# [1.3.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.2.0...v1.3.0) (2020-06-14)


### Features

* **github:** add lockdown config and messages [skip ci] ([cdbc252](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/cdbc252037a017110f9cfc4c7e576186d3e7c531))

# [1.2.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.1.0...v1.2.0) (2020-06-13)


### Continuous Integration

* **gitlab-ci:** remove temporary netmanagers workaround for caching [skip ci] ([d46f5e0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/d46f5e08de2548c4de01299aac67924a2f42ca1f))


### Features

* **gitlab-ci:** add `oraclelinux` ([3b1a5a2](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/3b1a5a29e522dce4753ffabfd31bee712a54d3e5))

# [1.1.0](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.0.1...v1.1.0) (2020-06-13)


### Features

* **gitlab-ci:** add `build` stage structure converted from Travis CI ([f0e22a6](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/f0e22a66ea214b3f9462ec0c1c48b112aa727d74))
* **gitlab-ci:** add build matrix converted from Travis CI ([70546e8](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/70546e895e8c5c21df826c0a3a5167c800aec0b6))

## [1.0.1](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/compare/v1.0.0...v1.0.1) (2020-06-13)


### Code Refactoring

* **black:** apply `black` modifications ([9f86a99](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/9f86a9932bb2d9d0add15c84bc4549eaa976f463))


### Continuous Integration

* **gitlab-ci:** add `black` to `lint` stage ([b890ad5](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/b890ad59eb79502fb325ffcf904f10c775512a48))
* **gitlab-ci:** add `commitlint` to `lint` stage ([a687802](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/a6878023ea67457372bfbb608c6949993eea9a89))
* **gitlab-ci:** add `hadolint` to `lint` stage ([c78f3e6](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/c78f3e69fd249738cfea7d2df91a7b8bba9391e8))
* **gitlab-ci:** add `yamllint` to `lint` stage ([5510603](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/5510603fd460d7f35a64f8cba0bc7ff399a9adb4))

# 1.0.0 (2020-06-13)


### Bug Fixes

* **amazonlinux:** disable py3 option ([dda443d](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/dda443d76601ae1f5a87fff9b1cb9d94828b2c69))
* **amazonlinux:** epel does not exist in amazonlinux, so we make it conditional ([51de7b7](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/51de7b7d88c64e4c4e8ca7a0c71a48da2002883a))
* **amazonlinux*:** reorder pip-related commands ([64256bf](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/64256bfa7e3a75c74089cc52222aba2b19a95ecc))
* **amazonlinux1:** procps-ns does not exist in this distro ([926c59a](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/926c59a9ffe0f6e9ba4ed66a5d7770769f4d2eb9))
* **arch-base:** add extra tag we use in formulas ([92d58c2](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/92d58c2b24c0bd202e42d440755ba56e7c323dd6))
* **bootstrap:** use bootstrap's develop branch ([9b4afcc](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/9b4afcc9df164b53b5bd5dec444227842b1ea4b5)), closes [/github.com/saltstack/salt-bootstrap/issues/1374#issuecomment-546747352](https://gitlab.com//github.com/saltstack/salt-bootstrap/issues/1374/issues/issuecomment-546747352)
* **build:** improve local build script ([dcef1d8](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/dcef1d8a45f0c23322d8a35398a06e3c32610253))
* **build.py:** reorder  &  to match bootstrap order ([2ac815d](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/2ac815dcd27bfa24ca94e817ba0737ce4f9569ba))
* **centos:** build for centos 8 and update centos 7 deps ([d69a530](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/d69a5304f1948d3cedb48fbcee5572b298aedf17))
* **centos6:** install correct pip version ([0b05d8f](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/0b05d8f9cf718f1f68bba5196a81ee13e2f2789f)), closes [#18](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/issues/18)
* **debian:** disable 2018.3, py2 in debian10 ([e2d7b17](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/e2d7b17f4ff22043c677436cf2d14f757524e912))
* **debian_ubuntu:** add systemd package to images ([f5eb0a9](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/f5eb0a91f82df6e99c77aaff3b92fbb7b304ae0a))
* **debian-10:** provide `python3-apt` extra package by default ([50e22ab](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/50e22aba7a637ebf427f5e7ddba470c83133e81a)), closes [/travis-ci.org/myii/nginx-formula/jobs/615599519#L1696](https://gitlab.com//travis-ci.org/myii/nginx-formula/jobs/615599519/issues/L1696) [/travis-ci.com/saltstack-formulas/php-formula/jobs/259515786#L3398](https://gitlab.com//travis-ci.com/saltstack-formulas/php-formula/jobs/259515786/issues/L3398)
* **dockerfile:** context vars for yum installs ([995a03a](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/995a03aab4cbcbb744a3877f958c16225bfa1b7e))
* **dockerfile.apt:** ensure `gnupg` & `dirmngr` are installed ([5230f9b](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/5230f9bfd024778953333b92fd2ba7210486409d))
* **dockerfiles:** conditionals construction ([d0b38a2](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/d0b38a2fcd453ae3fa6a4d2167920ab5e742b404))
* **dockerfiles:** increase verbosity of the shell commands ([2958e2f](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/2958e2fdb5e2294ab21d771741c96df2ec532001))
* **fedora:** 2017.7 does not compile correctly on py3 ([66f9fcb](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/66f9fcbdb69001bd3b25abf692aec4037cb6cfe0))
* **fedora:** missing findutils ([7509436](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/75094367bede9fbb8483af396f986a893b172f86))
* **fedora:** update lang packages ([311a304](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/311a304c51f7bacb4b2c49c6fa9dde2b4b5d5048))
* **inspec:** install with apt ([0151c8a](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/0151c8a7b7cea60e3c556b87044de237b1d128b7))
* **matrix.csv:** fix typo ([6835dbd](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/6835dbd56637e89998243209b34ef1d6a03f9983))
* **opensuse:** change repo mirror to fix timeout issues ([d61f51e](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/d61f51ea2ee92c5a779d65d043f565d3592d4538))
* **opensuse:** use `python2-pip` ([504b279](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/504b2794c99118dcae4f50ff3dcdd23fb6ce8fbb))
* **prepare:** PEBKAC's typo ([5808511](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/58085114d273db55c2e0fefb44af7fd1ad57ad5c))
* **services:** check to disable correctly under systemd/sysvinit ([5a37271](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/5a37271b979480c978bd401935a9cb2c39e26a18))
* **tests:** change branch from develop to master ([e0276e9](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/e0276e906de280113adc7720a4988b35ac5aece9))
* **tests:** use --versions-report to check the correct python version is used ([3546f88](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/3546f8814870d61f446ca7005e5c12ea6f78f184))
* **travis:** fix Centos8 dockerfile extension ([db94513](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/db945133aa6c14ce03b372983648d46621bd574e))
* **travis:** multiple minor fixes on centos-8 and ubuntu ([802c979](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/802c979b6f6db4c056f4c16aa186ffad68409609))
* **travis:** provide `amazonlinux-2-py3` images ([21f185b](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/21f185b1c252bbc8788a03b63d1783d3e4a163ba))
* **travis:** remove buildkit, as travis' docker does not support it ([d5b5593](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/d5b55934aecfc0337616fc908805f8d9e9498dda))
* **travis:** remove extra_packages duplicated entries ([f966a79](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/f966a79b232a79122a066201193ffafb939b7ecd))
* **travis:** use `SIM=stable` for `centos-8` ([318a8f3](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/318a8f3d0c488a69bc3e5aa46357bf9966352b6c)), closes [/freenode.logbot.info/salt/20200119#c3112474-c3112476](https://gitlab.com//freenode.logbot.info/salt/20200119/issues/c3112474-c3112476)
* **ubuntu:** add missing combination of distro/salt/python ([a366ebe](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/a366ebe8154b38f7ff72ff5e7c26d93361a4caea))
* **ubuntu-1804:** provide `python3-apt` extra package by default ([24e7034](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/24e70347e142371701659b9d4e9a7a4e7bb0d531))
* update debian and opensuse matrix ([ae48f01](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/ae48f0130c33bc601f2b32367b5c7bf8d14b5020))


### Code Refactoring

* **build:** implement travis builds ([9b43faf](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/9b43faf4fa419b1ed3ba4e1fae1fac98e223a87b))
* **matrix:** use `15.1` tag specifically for `opensuse/leap` ([965fea5](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/965fea5b39b0a443841c7435b24def1a9b6fedc4))


### Continuous Integration

* **travis:** add IRC notifications ([7295680](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/7295680f96e0bf28fcc196f630988171942d799e))
* **travis:** add notifications => zulip [skip ci] ([fb2dced](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/fb2dcede023c9bf7114d49cd636f2b0f80b6a281))
* **travis:** build `3000.1` images ([baa313c](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/baa313c362d61ccee7b9712600579c07e2ddbfc4))
* **travis:** build `3000.3` & `2019.2.5` images ([6e83b4b](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/6e83b4be6efa431c511a0c5324af4f1d940a5f0c))
* **travis:** build CVE `3000.2` & `2019.2.4` images ([981f7ca](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/981f7cac237de9dc1ca9a78a7477dd9a39b5b356))
* **travis:** deprecate `2017.7` ([244457e](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/244457e417685f454cf02c5301d3a9117fc84408))
* **travis:** deprecate `2018.3` ([901c35f](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/901c35f096633f6ced9deee7ef8a5f02fae79c85))
* **travis:** deprecate `debian-8` and `fedora-30` (EOL) ([624f5c3](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/624f5c3633b30d5932dd2a8a86fd667fafd4a898))
* **travis:** remove `py2` builds on `SV=master` (Sodium) [skip ci] ([9d66c10](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/9d66c100c9537800404f76f05514fd848a1e6bd6))
* **travis:** remove inapplicable notifications for `irc` ([ff83699](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/ff836998c5c1eaa9e6690c56cec1f27b05164307))
* **travis:** reorder `SV` & `SIM` to match bootstrap order ([16fe40b](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/16fe40badeb9ffa4c3011e2c3b180cdb6e2b203b))
* **travis:** standardise zulip notification (`template-formula`) [skip ci] ([0f5a953](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/0f5a9531ce80d1b3bbb97635fbcd00ab9557dfe1))
* **travis:** use new IRC channel (so that LogBot can be used) [skip ci] ([02a8ae1](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/02a8ae191629f5b694f8bb76f98a451fe87a7552))


### Documentation

* **readme:** rst formatting ([c9ec0f9](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/c9ec0f92b632975a82bbf152a6f26e8bdba285f5))
* **README:** re-add and update reade ([73ae938](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/73ae93882dd0b9b777bdacfd688d7b08f4bc855a))


### Features

* **amazonlinux:** add new distro, [by popular request :)](https://github.com/saltstack-formulas/vault-formula/pull/35#discussion_r301994954] ([7b38182](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/7b38182af619e9e7d132c876e86fc286b9329d75)), closes [/github.com/saltstack-formulas/vault-formula/pull/35#discussion_r301994954](https://gitlab.com//github.com/saltstack-formulas/vault-formula/pull/35/issues/discussion_r301994954)
* **amazonlinux-1:** provide images for this platform ([1b7f07c](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/1b7f07c7006bad978a7fd0ba1da88fdccb311b36))
* **centos-7-py2:** replace with `py3` due to Testinfra/InSpec failures ([6af9b06](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/6af9b06bb2494c23f5d16a8fe26d16dd9cac89f7))
* **clean:** remove pyc files to reduce image size ([002c508](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/002c5080e539e804272a5e846a3c3376fff14104))
* **distros:** add ArchLinux builds ([d6e57f6](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/d6e57f6b22570530a627c89a94fed02754a3197d))
* **dockerfile.zyp:** remove workaround (SaltStack repo has been fixed) ([2a418f5](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/2a418f5408d031ec0d518c000bb39eac7b1218a7))
* **dockerfile.zyp:** use workaround until `repo.saltstack.com` is fixed ([0062be3](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/0062be3bdd3545b9442ec3b8968336ebc2559537))
* **dockerfiles:** compact and lint to reduce image sizes ([620d8bc](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/620d8bcf505cd371d438e5d7f9e056ac5cccca15))
* **dockerhub:** deploy images ([f20a1a7](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/f20a1a7bfd67381913985551a3c91eb65524642d))
* **getty+udev:** adjust implementation to cater for platform specifics ([7845b7b](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/7845b7b45e6219afa6d3752f115633b328c3aba8)), closes [/github.com/netmanagers/salt-image-builder/pull/32#issuecomment-604966021](https://gitlab.com//github.com/netmanagers/salt-image-builder/pull/32/issues/issuecomment-604966021)
* **getty+udev:** remove targets to reduce cpu+mem footprint ([0c6fd51](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/0c6fd5151f5bc776735c6ef6be507e4e85c23b51)), closes [#30](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/issues/30)
* **matrix:** add new images, allow comments ([c8a8bf8](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/c8a8bf8f5b3e56e6388b43650c167d2811b65c2d))
* **matrix:** new ubuntu distro requested ([326dcfc](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/326dcfcc41cd3fa21d9f0d445d459d08d2aaa13a)), closes [#10](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/issues/10)
* **matrix:** update matrix, new distros ([5033924](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/5033924c4225168f275d8c0d37ef2d58a3aab672))
* **matrix:** update to current OS/Salt/Py versions ([1321c2e](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/1321c2e2b4e5a5c378558cfbb93dd91a69e10a25))
* **matrix.csv:** new debian release ([1c10f54](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/1c10f540d26eaa5b89144c372bd7daaf68be92f2))
* **neon:** build images for `3000` ([29b6309](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/29b63090b12c6b5df09ec771556e706c81698094))
* **opensuse:** upgrade `leap-15.1` to `leap-15.2` ([0781ccf](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/0781ccfb4f7394ef558cdfd6cace8c8e9d463df2))
* **pip:** add python pip binary to images, with tests ([bdf7525](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/bdf752546be1b21e58d3870826d9fb430a7e42be))
* **python38:** add `ubuntu-20.04` & `fedora-32` for `master` only ([cd2d8af](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/cd2d8afac17a7b6879aad2e187053d06a91780b9))
* **semantic-release:** implement for this repo ([9cc927c](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/9cc927c690924c3101e458e769981b031d837e4a))
* **services:** disable services at boot time ([b4595eb](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/b4595eb9e09d3a1bacf5c8f8e3aa57c721b75879))
* **travis:** add extra debugging ([321cd12](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/321cd1239eaf5c01a6d24545eef452a012e2d20e))
* **travis:** enable the whole build matrix ([c3f46b3](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/c3f46b366485e814cc80907a23632ebc0c2b2d89))


### Styles

* **travis:** vertically align all platform build specs ([d8f0cc5](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/d8f0cc5c56579c58d8454cdba590a1cbf7a7e764))


### Tests

* **salt_pkgs:** update `master` to `3000` (version number for `Neon`) ([89edc5d](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/89edc5d1c88e49b5aa3e417ae4b84aae1c4d36d4))
* **salt_pkgs:** update `master` to `Neon` ([9ea4d0a](https://gitlab.com/saltstack-formulas/infrastructure/salt-image-builder/commit/9ea4d0a9740aeaf5747c41c93c6adb4880beee10))


### BREAKING CHANGES

* **build:** This change drops the old `matrix.csv`+`packer` builds in favor of a
`.travis.yml`+`Dockerfiles`, to allow layers reuse in docker and clearer view of
requirements in the different Dockerfiles.
