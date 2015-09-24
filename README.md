# watchx
Tool that watches files and executes scripts

## Install

```sh
npm install --global watchx
```

## Usage

Copy example config and edit to fit your needs, then execute:

```sh
watchx [config file]
```

## Example config

```json
{
  "DIR"     : "/directory/to/watch",
  "IGNORE"  : [".git/**", "node_modules"],
  "DEBOUNCE": 100,
  "ACTIONS" : {
    "SINGLE_CHANGE"  : "/scripts/single_change.sh",
    "MULTIPLE_CHANGE": "/scripts/multiple_change.sh"
  }
}
```

## Actions
Each action has corresponding script for execution. Here is a list of actions:
- `SINGLE_CHANGE` – only one file was changed
- `MULTIPLE_CHANGE` – multiple files were changed in period of _debounce_
