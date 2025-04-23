---
title: "Getting Started w/ MongoDB (8.0) in WSL [Ubuntu (24.04)]"
description: "Quick Start Guide + Tips & Tricks for running MongoDB on WSL (Ubuntu)"
pub_date: "Apr 23 2025"
hero_img: "/post_img.webp"
---
## Install MongoDB Community Edition
[Official Instructions via MongoDB `apt` source(s)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition)<br>
The (package) installation instructions are pretty straight-forward, following the steps and trivially copy-pasting should work on most users' environments/shells but I've still provided a quick summary below:
1. Import public key
```bash
sudo apt-get install gnupg curl # Install prereq pkgs to pull -> add MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
```
2. Create `/etc/apt/sources.list.d/mongodb-org-8.0.list`(for given Ubuntu version)
```bash
# Run the command below and modify/substitute the (template) URL as needed to match your Ubuntu release/version \— `https://repo.mongodb.org/apt/ubuntu ${release}/mongodb-org/8.0 multiverse`
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
```
3. Install package via (newly) created/imported source
```bash
sudo apt-get update && sudo apt-get install -y mongodb-org
```

### Directories
Installing the official MongoDB package [pkg] via `apt-get` will automatically create relevant configuration directories & files. This data, by default, will be created/stored at these respective paths: [conf file `/etc/mongod.conf`, data dir `/var/lib/mongodb`, log dir `/var/log/mongodb`]

### Users/Groups
The `apt` pkg installation process also creates a specific `mongodb` *user* + *group* to handle permissions for relevant MongoDB client/document/server directories & files.
```bash
info: Selecting UID from range 100 to 999 ...

info: Adding system user `mongodb' (UID 105) ...
info: Adding new user `mongodb' (UID 105) with group `nogroup' ...
info: Not creating `/nonexistent'.
info: Selecting GID from range 100 to 999 ...
info: Adding group `mongodb' (GID 108) ...
info: Adding user `mongodb' to group `mongodb' ...
```

## Running MongoDB server process -`mongod`
There are typically 2 methods/ways of running MongoDB upon installing its `apt` pkg in Ubuntu.

### Background Process / Daemon via`systemd`
This is likely the preferred method of running MongoDB in the back{end|ground} as it doesn't tie up a shell instance/window in running `mongod`. The `apt` pkg installation's defaults also seem to point to this being the standard method of getting up and running with MongoDB on Ubuntu (WSL). The `/etc/mongod.conf` file in particular signals this based on its default setting(s).
```yaml
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb
#  engine:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1

# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

#security:

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:
```
The `storage.dbPath`:`/var/lib/mongodb` and `systemLog.path`:`/var/log/mongodb/mongod.log` keys/values here point to directories/files that are automagically created in the `apt` pkg installation process. The `.../mongod.log` file will be particularly helpful in debugging/troubleshooting any installation/initialization issues along with any errors that may follow.

### Managing`mongod` service via`systemctl`
In order to run/manage the `mongod` server process, `systemd` (Ubuntu's built-in [init system](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-init-system)) must be enabled in WSL(2). This can be done by adding the following to your `/etc/wsl.conf` file (preferably at the start/top).
```ini
[boot]
systemd=true
```

Upon enabling `systemd` (& potentially re{loading/starting} WSL), you should be able to use `systemctl` to enable -> start/stop the `mongod` process and check its status.
```bash
sudo systemctl start mongod
sudo systemctl daemon-reload # Run this command if you run into the error `Failed to start mongod.service: Unit mongod.service not found.`

sudo systemctl status mongod
sudo systemctl enable mongod # This enables the `mongod` daemon to run upon system reboot/startup

sudo systemctl stop mongod
sudo systemctl restart mongod

mongosh # Open a `mongosh` process/session to connect to & interface with the running `mongod` process/server
```
---
### Foreground Process
Running `mongod` on its own as a server instance/process will likely fail if only `apt` pkg configuration/installation is done as it, by default, expects a `/data/db` directory to be present. Since `mongod` simply invokes the server process (without a configuration file), it will fail to start up if the `/data/db` path is a `NonExistentPath`. The `--dbpath` CLI flag *could* be specified/used to address this error (e.g. pointing it to the `/etc/mongod.conf` path).

Typically, the first standalone run of `mongod` will fail for most users on a fresh WSL Ubuntu install as the `/data/db` directory likely won't be present. However, this initial run may cause potential issues with (re)starting the systemctl `mongod` service. Starting a `mongod` server instance as a foreground/user process will override the ownership of the `/tmp/mongodb-27017.sock` default Unix domain socket (file) from the created `mongodb`:`mongodb` *user*:*group* to the `{home_user}:{home_user}` *user*:*group*. This will break the `mongod` systemctl service as it expects the MongoDB socket file to be owned by the `mongodb:mongodb` *user*:*group*. To fix this issue, we can either modify the file permissions appropriately OR remove the socket file altogether and have the `mongod` systemctl service create it again upon initialization/startup.
```bash
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock # more graceful
# OR
sudo rm -rf /tmp/mongodb-27017.sock # more forceful
```

## Interfacing with MongoDB
### mongosh
As previously mentioned, `mongosh` can be used to open a shell on and interface with the running `mongod` process/server. Upon running the `mongosh` command (in WSL/Ubuntu), you should be met with a prompt along the lines of:
```bash
Current Mongosh Log ID: #{some-id}
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.0
Using MongoDB:          8.0.8 #{`mongod` version}
Using Mongosh:          2.5.0 #{`mongosh` version}

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

---
# Bootup/Startup Warnings #
---

{db-name-here}>
```
Running the `help` command from here will provide some useful guidance and the shell can be exited via `Ctrl` (`^`) + `C` x 2, `Ctrl` (`^`) + `D`, or typing `exit` || `quit`.

### MongoDB Compass
MongoDB Compass is MongoDB's "native" / default / free GUI application. It can be installed in WSL (Ubuntu) via:
```bash
wget https://downloads.mongodb.com/compass/mongodb-compass_1.45.4_amd64.deb \

sudo apt install ./mongodb-compass_1.45.4_amd64.deb \
# OR
sudo dpkg -i mongodb-compass_1.45.4_amd64.deb \
sudo apt-get install -f \ # This installs required compass dependencies

mongodb-compass
```
This will start the MongoDB Compass application within the WSL environment and open up a shared GUI context/window that can be interfaced with between Windows & WSL.

Alternatively, MongoDB Compass can be installed in Windows via `.exe`/`.msi` package and interface directly with the `mongod` process/server running on the WSL(2) VM via `localhost forwarding`. For example, the `mongodb://localhost:27017` connection string can be used interchangeably when running Compass via WSL *or* Windows as their (local) networks are bridged. Running Compass in Windows on a WSL development environment is likely **preferable** as it provides a more direct interface/path to hardware resources and management.
