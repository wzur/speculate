# speculate

> Automatically generates an RPM Spec file for your Node.js project

## Installation

```
npm install --global speculate
```

## Features

* Generates an RPM Spec file for your project
* Creates a [systemd](https://www.freedesktop.org/wiki/Software/systemd/) service definition file
* Supports configuration using your existing `package.json`
* Currently supports CentOS 7

## Usage

Let's start with a simple Node.js project:

```
my-cool-api
├── package.json
└── server.js

0 directories, 2 files
```

Run the `speculate` command from inside the project directory:

```
speculate
```

You've now got an RPM Spec file and a systemd service definition for your project. You'll also notice that your application has been packaged into a `tar.gz` archive, ready to be built with an RPM building tool like [`rpmbuild`](http://www.rpm.org/max-rpm-snapshot/rpmbuild.8.html) or [`mock`](https://fedoraproject.org/wiki/Mock):

```
my-cool-api
├── SOURCES
│   └── my-cool-api.tar.gz
├── SPECS
│   └── my-cool-api.spec
├── my-cool-api.service
├── package.json
└── server.js

2 directories, 5 files
```

Speculate is designed to be used at build time, just before you package your application into an RPM. Because of this, we recommend adding the generated files to your `.gitignore` file:

```
*.service
SOURCES
SPECS
```

## Configuration

Speculate is configured using the `spec` property inside your existing `package.json` file.

### Dependencies

To add a dependency to the generated spec file, list the package dependencies in the `requires` array:

```json
{
  "spec": {
    "requires": [
      "vim",
      "screen",

    ]
  }
}
```

### Executables

If you have scripts that need to be executable when they're installed on your target server, add them to the `executable` array. You can list both files and entire directories:

```json
{
  "spec": {
    "executable": [
      "./other-scripts/my-script.js",
      "./scripts"
    ]
  }
}
```

### Environment

By default, the systemd service will start your application with the `NODE_ENV=production` environment variable. If you need to override this or add additional environment variables, use the `environment` property:

```json
{
  "spec": {
    "environment": {
      "NODE_ENV": "production",
      "MY_VAR": "foo"
    }
  }
}
```
